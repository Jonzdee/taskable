import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import { useApp } from "../context/AppContext";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function TaskVerify() {
  const { id } = useParams();
  const { updateTask } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    // Real OCR Processing
    const { data } = await Tesseract.recognize(file, "eng");

    // Check if the word "following" or "followed" is in the screenshot
    const isSuccess =
      data.text.toLowerCase().includes("following") ||
      data.text.toLowerCase().includes("follow");

    setLoading(false);
    if (isSuccess) {
      setResult("success");
      updateTask(parseInt(id), "pending");
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      setResult("fail");
    }
  };

  return (
    <div className="max-w-md mx-auto text-center py-10">
      <h2 className="text-2xl font-bold mb-6">Upload Proof</h2>

      <label className="border-4 border-dashed border-zinc-800 rounded-[2rem] p-12 flex flex-col items-center cursor-pointer hover:bg-zinc-900 transition mb-6">
        <Upload size={48} className="text-tiktok-pink mb-4" />
        <p className="font-bold">Click to upload screenshot</p>
        <input
          type="file"
          className="hidden"
          onChange={handleVerify}
          disabled={loading}
        />
      </label>

      {loading && (
        <div className="flex items-center justify-center gap-3 text-tiktok-cyan font-bold">
          <Loader2 className="animate-spin" /> Analyzing Screenshot...
        </div>
      )}

      {result === "success" && (
        <div className="text-emerald-400 font-bold flex items-center justify-center gap-2">
          <CheckCircle2 /> Verified! Redirecting...
        </div>
      )}

      {result === "fail" && (
        <p className="text-tiktok-pink font-bold italic">
          Verification failed. Make sure "Following" is visible.
        </p>
      )}
    </div>
  );
}
