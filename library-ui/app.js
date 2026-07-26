"use strict";

/**
 * Frontend đang khớp với backend hiện tại:
 * - Đăng nhập bằng username + password.
 * - Backend trả access_token.
 * - Access token chỉ được giữ trong bộ nhớ của trang.
 * - Chỉ lưu tên đăng nhập khi người dùng chọn "Ghi nhớ".
 *
 * Backend hiện chưa có /auth/refresh và /auth/logout nên:
 * - Tải lại trang sẽ cần đăng nhập lại.
 * - Đăng xuất được xử lý ở phía frontend.
 */



const API_BASE =
  (typeof window !== "undefined" && window.location ?
    `${window.location.protocol}//${window.location.hostname}:3000` :
    "http://127.0.0.1:3000");

console.log("Backend API:", API_BASE);

let accessToken = null;
let currentUser = null;
let toastTimer = null;

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  console.log("app.js đã chạy");

  elements.loginView =
    document.getElementById("loginView");

  elements.protectedApp =
    document.getElementById("protectedApp");

  elements.loginForm =
    document.getElementById("loginForm");

  elements.username =
    document.getElementById("loginEmail");

  elements.password =
    document.getElementById("loginPassword");

  elements.rememberMe =
    document.getElementById("rememberMe");

  elements.loginButton =
    document.getElementById("loginButton");

  elements.loginMessage =
    document.getElementById("loginMessage");

  elements.togglePassword =
    document.querySelector(".password-toggle");

  elements.logoutButton =
    document.getElementById("logoutButton");

  elements.userName =
    document.getElementById("userName");

  elements.userEmail =
    document.getElementById("userEmail");

  elements.userInitials =
    document.getElementById("userInitials");

  elements.toast =
    document.getElementById("authToast");

  elements.loginForm.addEventListener(
    "submit",
    handleLogin
  );

  configureUsernameField();
  bindAuthenticationEvents();
  restoreSession();
  restoreRememberedUsername();

  console.log("Đã gắn sự kiện đăng nhập");
});

function configureUsernameField() {
  if (!elements.username) {
    return;
  }

  elements.username.type = "text";
  elements.username.name = "username";
  elements.username.autocomplete = "username";
  elements.username.placeholder = "Nhập tên đăng nhập";
  elements.username.minLength = 3;
  elements.username.maxLength = 50;

  const label = elements.username.closest("label");
  const labelTitle = label?.firstElementChild;

  if (labelTitle) {
    labelTitle.textContent = "Tên đăng nhập";
  }
}

function bindAuthenticationEvents() {
  elements.loginButton?.addEventListener(
    "click",
    handleLogin
  );

  elements.loginForm?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      handleLogin(event);
    }
  );

  elements.password?.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleLogin(event);
      }
    }
  );

  elements.togglePassword?.addEventListener(
    "click",
    togglePasswordVisibility
  );

  elements.logoutButton?.addEventListener(
    "click",
    handleLogout
  );
}


function restoreSession() {
  /*
   * Backend hiện chưa có /auth/refresh.
   * Vì access token không lưu trong localStorage nên khi tải lại trang
   * người dùng sẽ quay về màn hình đăng nhập.
   */
  setCheckingState(false);
  showLoginScreen();
}

async function handleLogin(event) {
  event.preventDefault();
  
  clearLoginMessage();

  if (!elements.loginForm.reportValidity()) {
    return;
  }

  const username = elements.username.value.trim();
  const password = elements.password.value;
  const rememberMe = elements.rememberMe.checked;

  setLoginLoading(true);

  try {
    const response = await fetchJson("/auth/login", {
      method: "POST",
      skipAuthorization: true,
      body: {
        username,
        password
      }
    });

    console.log("Login response:", response);

    if (!response?.access_token) {
      throw new ApiError(
        500,
        "Backend không trả về access_token."
      );
    }

    accessToken = response.access_token;

    saveRememberedUsername(
      username,
      rememberMe
    );

    elements.password.value = "";

    showProtectedApplication({
      username
    });

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
  currentUser = null;

  elements.password.value = "";

  showLoginScreen("Bạn đã đăng xuất.");
}

async function fetchJson(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    skipAuthorization = false
  } = options;

  const requestHeaders = {
    Accept: "application/json",
    ...headers
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] =
      "application/json";
  }

  if (!skipAuthorization && accessToken) {
    requestHeaders.Authorization =
      `Bearer ${accessToken}`;
  }

  const response = await fetch(
    `${API_BASE}${path}`,
    {
      method,
      headers: requestHeaders,
      cache: "no-store",

      body:
        body === undefined
          ? undefined
          : JSON.stringify(body)
    }
  );

  const data = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Yêu cầu thất bại với mã ${response.status}.`;

    throw new ApiError(
      response.status,
      normalizeMessage(message)
    );
  }

  return data;
}

async function parseResponseBody(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}

function showProtectedApplication(user) {
  currentUser = user;

  updateUserInterface(user);

  // Ẩn màn hình đăng nhập
  elements.loginView.classList.add("is-hidden");
  elements.loginView.setAttribute(
    "aria-hidden",
    "true"
  );
  elements.loginView.style.display = "none";

  // Hiện giao diện bên trong
  elements.protectedApp.classList.remove("is-hidden");
  elements.protectedApp.setAttribute(
    "aria-hidden",
    "false"
  );
  elements.protectedApp.style.display = "flex";

  document.body.style.overflow = "";
  document.title = "Thư viện số";

  console.log("Đã chuyển vào giao diện thư viện");
}

function showLoginScreen(message = "") {
  elements.protectedApp.classList.add(
    "is-hidden"
  );

  elements.protectedApp.setAttribute(
    "aria-hidden",
    "true"
  );

  elements.loginView.classList.remove(
    "is-hidden"
  );

  elements.loginView.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "";
  document.title =
    "Đăng nhập | Thư viện số";

  if (message) {
    setLoginMessage(message);
  } else {
    clearLoginMessage();
  }

  window.setTimeout(() => {
    elements.username.focus();
  }, 50);
}

function updateUserInterface(user) {
  const displayName =
    user?.ho_ten ||
    user?.name ||
    user?.username ||
    "Độc giả";

  const username =
    user?.username || "";

  const roleLabels = {
    admin: "Quản trị viên",
    librarian: "Thủ thư",
    reader: "Độc giả"
  };

  elements.userName.textContent =
    displayName;

  elements.userEmail.textContent =
    `${roleLabels[user?.role] || "Độc giả"}${
      username ? ` • ${username}` : ""
    }`;

  elements.userInitials.textContent =
    createInitials(displayName);
}

function createInitials(name) {
  const initials = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => {
      return part[0]?.toUpperCase();
    })
    .join("");

  return initials || "TV";
}

function togglePasswordVisibility() {
  const showing =
    elements.password.type === "text";

  elements.password.type =
    showing
      ? "password"
      : "text";

  elements.togglePassword.setAttribute(
    "aria-pressed",
    String(!showing)
  );

  elements.togglePassword.setAttribute(
    "aria-label",
    showing
      ? "Hiện mật khẩu"
      : "Ẩn mật khẩu"
  );
}

function saveRememberedUsername(
  username,
  rememberMe
) {
  try {
    localStorage.removeItem(
      "library:last-email"
    );

    if (rememberMe) {
      /*
       * Chỉ nhớ tên đăng nhập.
       * Không lưu mật khẩu hoặc access token.
       */
      localStorage.setItem(
        "library:last-username",
        username
      );
    } else {
      localStorage.removeItem(
        "library:last-username"
      );
    }
  } catch {
    // Đăng nhập vẫn hoạt động nếu trình duyệt chặn localStorage.
  }
}

function restoreRememberedUsername() {
  try {
    const rememberedUsername =
      localStorage.getItem(
        "library:last-username"
      ) ||
      localStorage.getItem(
        "library:last-email"
      );

    if (rememberedUsername) {
      elements.username.value =
        rememberedUsername;

      elements.rememberMe.checked = true;
    }
  } catch {
    // Đăng nhập vẫn hoạt động nếu trình duyệt chặn localStorage.
  }
}

function setCheckingState(checking) {
  elements.loginView.classList.toggle(
    "auth-page--checking",
    checking
  );
}

function setLoginLoading(loading) {
  elements.loginButton.disabled =
    loading;

  elements.loginButton.classList.toggle(
    "is-loading",
    loading
  );

  elements.username.disabled = loading;
  elements.password.disabled = loading;
  elements.rememberMe.disabled = loading;
}

function setLoginMessage(
  message,
  success = false
) {
  elements.loginMessage.textContent =
    message;

  elements.loginMessage.classList.toggle(
    "is-success",
    success
  );
}

function clearLoginMessage() {
  setLoginMessage("");
}

function showToast(message) {
  if (!elements.toast) {
    return;
  }

  elements.toast.textContent =
    message;

  elements.toast.classList.add(
    "is-visible"
  );

  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove(
      "is-visible"
    );
  }, 2800);
}

function normalizeMessage(message) {
  return Array.isArray(message)
    ? message.join(". ")
    : String(message);
}

function toFriendlyMessage(error) {
  if (error instanceof TypeError) {
    return (
      "Không thể kết nối tới máy chủ. " +
      "Hãy chạy backend ở cổng 5000 " +
      "và mở frontend bằng Live Server."
    );
  }

  if (error instanceof ApiError) {
    if (error.status === 401) {
      return (
        "Tên đăng nhập hoặc mật khẩu không đúng."
      );
    }

    if (error.status === 429) {
      return (
        "Bạn thử đăng nhập quá nhiều lần. " +
        "Vui lòng chờ một phút."
      );
    }

    return error.message;
  }

  return (
    "Đã xảy ra lỗi. " +
    "Vui lòng thử lại."
  );
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);

    this.name = "ApiError";
    this.status = status;
  }
}