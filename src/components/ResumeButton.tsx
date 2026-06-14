"use client";

export function ResumeButton() {
  function handleClick() {
    window.open("/resume.pdf", "_blank");
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Yuxuan_Liu_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <button
      onClick={handleClick}
      className="inline-block px-8 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors font-semibold"
    >
      View Resume
    </button>
  );
}
