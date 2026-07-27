"use strict";

/**
 * Thư viện số — app.js
 * Gộp 2 phần:
 * 1) Đăng nhập thật, gọi backend NestJS (/auth/login) — access token giữ trong bộ nhớ, không lưu localStorage.
 * 2) Giao diện dashboard "Kho sách": mở/đóng sidebar, lọc sách theo trạng thái, đăng xuất.
 *
 * Backend hiện chưa có /auth/refresh và /auth/logout nên:
 * - Tải lại trang sẽ cần đăng nhập lại.
 * - Đăng xuất được xử lý ở phía frontend.
 *
 * LƯU Ý: danh sách sách trong .book-card hiện vẫn là dữ liệu mockup tĩnh trong index.html,
 * chưa gọi GET /sach. Muốn nối dữ liệu thật, thay phần render card bằng fetchJson('/sach').
 */

function resolveApiBase() {
  if (typeof window === "undefined" || !window.location) {
    return "http://127.0.0.1:3000";
  }

  const { protocol, hostname } = window.location;

  const isLocal = ["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"].includes(hostname);
  if (isLocal) return "http://127.0.0.1:3000";

  // GitHub Codespaces: hostname dạng "<ten>-<port>.app.github.dev".
  // Không thể ghép ":3000" trực tiếp — phải thay số port trong chính hostname.
  if (protocol === "https:" && hostname.endsWith(".app.github.dev")) {
    const backendHost = hostname.replace(/-(\d+)\.app\.github\.dev$/, "-3000.app.github.dev");
    return `${protocol}//${backendHost}`;
  }

  // Mặc định: same-origin, đổi sang cổng 3000.
  return `${protocol}//${hostname}:3000`;
}

const API_BASE = resolveApiBase();
console.log("Backend API:", API_BASE);

let accessToken = null;
let toastTimer = null;

const el = {};

document.addEventListener("DOMContentLoaded", () => {
  el.loginView = document.getElementById("loginView");
  el.protectedApp = document.getElementById("protectedApp");
  el.loginForm = document.getElementById("loginForm");
  el.username = document.getElementById("loginUsername");
  el.password = document.getElementById("loginPassword");
  el.rememberMe = document.getElementById("rememberMe");
  el.loginButton = document.getElementById("loginButton");
  el.loginMessage = document.getElementById("loginMessage");
  el.togglePassword = document.querySelector(".password-toggle");
  el.logoutButton = document.getElementById("logoutButton");
  el.userName = document.getElementById("userName");
  el.userRole = document.getElementById("userRole");
  el.userInitials = document.getElementById("userInitials");
  el.toast = document.getElementById("authToast");

  el.sidebar = document.getElementById("sidebar");
  el.sidebarBackdrop = document.getElementById("sidebarBackdrop");
  el.menuToggle = document.querySelector(".menu-toggle");

  bindAuthEvents();
  bindDashboardEvents();
  restoreRememberedUsername();
});

/* ========================================================================
   ĐĂNG NHẬP / ĐĂNG XUẤT
   ======================================================================== */

function bindAuthEvents() {
  el.loginForm?.addEventListener("submit", handleLogin);

  el.password?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin(event);
    }
  });

  el.togglePassword?.addEventListener("click", togglePasswordVisibility);
  el.logoutButton?.addEventListener("click", handleLogout);
}

async function handleLogin(event) {
  event.preventDefault();
  clearLoginMessage();

  if (!el.loginForm.reportValidity()) return;

  const username = el.username.value.trim();
  const password = el.password.value;
  const rememberMe = el.rememberMe.checked;

  setLoginLoading(true);

  try {
    const response = await fetchJson("/auth/login", {
      method: "POST",
      skipAuthorization: true,
      body: { username, password },
    });

    if (!response?.access_token) {
      throw new ApiError(500, "Backend không trả về access_token.");
    }

    accessToken = response.access_token;
    saveRememberedUsername(username, rememberMe);
    el.password.value = "";

    showProtectedApp({ username });
    showToast("Đăng nhập thành công.");
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    accessToken = null;
    setLoginMessage(toFriendlyMessage(error));
  } finally {
    setLoginLoading(false);
  }
}

function handleLogout() {
  accessToken = null;
  el.password.value = "";
  closeSidebar();
  showLoginScreen("Bạn đã đăng xuất.");
}

function showProtectedApp(user) {
  const displayName = user?.username || "Độc giả";

  el.userName.textContent = displayName;
  el.userRole.textContent = "Thủ thư";
  el.userInitials.textContent = createInitials(displayName);

  el.loginView.classList.add("is-hidden");
  el.protectedApp.classList.remove("is-hidden");
  document.title = "Kho sách | Thư viện số";
}

function showLoginScreen(message = "") {
  el.protectedApp.classList.add("is-hidden");
  el.loginView.classList.remove("is-hidden");
  document.title = "Đăng nhập | Thư viện số";

  message ? setLoginMessage(message) : clearLoginMessage();
  window.setTimeout(() => el.username?.focus(), 50);
}

function createInitials(name) {
  const initials = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  return initials || "TV";
}

function togglePasswordVisibility() {
  const showing = el.password.type === "text";
  el.password.type = showing ? "password" : "text";
  el.togglePassword.textContent = showing ? "👁" : "🙈";
  el.togglePassword.setAttribute("aria-label", showing ? "Hiện mật khẩu" : "Ẩn mật khẩu");
}

function saveRememberedUsername(username, rememberMe) {
  try {
    if (rememberMe) {
      localStorage.setItem("library:last-username", username);
    } else {
      localStorage.removeItem("library:last-username");
    }
  } catch {
    // Đăng nhập vẫn hoạt động nếu trình duyệt chặn localStorage.
  }
}

function restoreRememberedUsername() {
  try {
    const saved = localStorage.getItem("library:last-username");
    if (saved && el.username) {
      el.username.value = saved;
      el.rememberMe.checked = true;
    }
  } catch {
    // bỏ qua nếu localStorage bị chặn
  }
}

function setLoginLoading(loading) {
  el.loginButton.disabled = loading;
  el.loginButton.textContent = loading ? "Đang đăng nhập..." : "Đăng nhập";
  el.username.disabled = loading;
  el.password.disabled = loading;
  el.rememberMe.disabled = loading;
}

function setLoginMessage(message) {
  el.loginMessage.textContent = message;
}
function clearLoginMessage() {
  setLoginMessage("");
}

function showToast(message) {
  if (!el.toast) return;
  el.toast.textContent = message;
  el.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.toast.classList.remove("is-visible"), 2800);
}

/* ========================================================================
   GỌI API BACKEND
   ======================================================================== */

async function fetchJson(path, options = {}) {
  const { method = "GET", body, headers = {}, skipAuthorization = false } = options;

  const requestHeaders = { Accept: "application/json", ...headers };
  if (body !== undefined) requestHeaders["Content-Type"] = "application/json";
  if (!skipAuthorization && accessToken) requestHeaders.Authorization = `Bearer ${accessToken}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: requestHeaders,
    cache: "no-store",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    const message = data?.message || data?.error || `Yêu cầu thất bại với mã ${response.status}.`;
    throw new ApiError(response.status, normalizeMessage(message));
  }

  return data;
}

async function parseResponseBody(response) {
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  return response.json();
}

function normalizeMessage(message) {
  return Array.isArray(message) ? message.join(". ") : String(message);
}

function toFriendlyMessage(error) {
  if (error instanceof TypeError) {
    return "Không thể kết nối tới máy chủ. Hãy chắc chắn backend đang chạy ở cổng 3000.";
  }
  if (error instanceof ApiError) {
    if (error.status === 401) return "Tên đăng nhập hoặc mật khẩu không đúng.";
    if (error.status === 429) return "Bạn thử đăng nhập quá nhiều lần. Vui lòng chờ một phút.";
    return error.message;
  }
  return "Đã xảy ra lỗi. Vui lòng thử lại.";
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/* ========================================================================
   DASHBOARD: SIDEBAR + LỌC SÁCH THEO TRẠNG THÁI
   ======================================================================== */

function bindDashboardEvents() {
  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".book-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.status === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });

  el.menuToggle?.addEventListener("click", () => {
    el.sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });
  el.sidebarBackdrop?.addEventListener("click", closeSidebar);
}

function openSidebar() {
  el.sidebar?.classList.add("open");
  el.sidebarBackdrop?.classList.add("show");
}

function closeSidebar() {
  el.sidebar?.classList.remove("open");
  el.sidebarBackdrop?.classList.remove("show");
}

// Được gọi trực tiếp từ nút X trong sidebar (onclick="closeSidebar()")
window.closeSidebar = closeSidebar;