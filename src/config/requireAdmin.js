const requiresAdmin = (gssp) => {
  return async (context) => {
    const { req } = context;
    const adminToken = req.cookies.admin_auth_token;

    if (!adminToken) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    return gssp(context);
  };
};

export default requiresAdmin;
