export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  try {
    const data = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      credentials: "include", // 🔥 بدون این، کوکی‌ها منتقل نمی‌شن
      body: body,
      headers: {
        Accept: "application/json",
      },
    });

    console.log("data" ,  data);

    setCookie(event, "accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // ❗ حتما lax بزن نه none
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    setCookie(event, "refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // ❗ حتما lax بزن نه none
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return data;
  } catch (error) {
        console.log("error" ,  error);
    return error;
  }
});
