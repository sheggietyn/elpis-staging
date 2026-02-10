// app/api/downloadFile/route.js
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");
    if (!fileUrl) {
      return new Response(JSON.stringify({ error: "URL parameter missing" }), {
        status: 400,
      });
    }
    // Use fileUrl AS-IS — do NOT decode
    let filename = fileUrl.split("/").pop().split("?")[0];
    filename = filename.replace(/^AllImages%2F/, "").replace(/^AllImages_/, "");

    if (!filename) filename = "downloaded-file";

    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("File fetch failed");

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
