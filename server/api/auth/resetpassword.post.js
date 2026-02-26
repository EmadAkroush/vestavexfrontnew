// server/api/auth/reset-password.post.ts

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {
    public: { apiBase },
  } = useRuntimeConfig();

  console.log("🔥 RESET PASSWORD API HIT", body);

  try {
    const data = await $fetch(`${apiBase}/auth/reset-password`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error("❌ RESET PASSWORD ERROR:", error?.data || error);

    throw createError({
      statusCode: error?.statusCode || 500,
      message: error?.data?.message || "Reset password failed",
    });
  }
});
