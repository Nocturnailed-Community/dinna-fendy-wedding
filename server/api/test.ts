// server/api/test.ts

export default defineEventHandler(async (event) => {
    // Your logic here, e.g., returning a simple JSON response
    return {
      message: "This is a test response",
      status: "success",
    };
  });
  