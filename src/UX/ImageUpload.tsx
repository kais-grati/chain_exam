import { useState, useRef } from "react";
import { Upload, X, CheckCircle, Loader2, Send, Edit3 } from "lucide-react";
import { API_ENDPOINT, STUDENT_CAP_TYPE } from "./constants";
import { Transaction } from "@mysten/sui/transactions";
import getOwnedObjects from "./suiQueryUtil";
import { useNetworkVariable } from "./networkConfig";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";

const sample_result = {
  fileName: "scan.jpg",
  fileSize: "520022",
  success: true,
  text: "Question 1: La connection manuelle des examens est lente, coûteuse et\nparfois biaisée. Un correcteur peut être influencé par\nbe\nmom\nde l'étudiant où\nSon écriture. De plus, d'autres problèmes majeurs sont récurrents\nComme la perte de copies, le favoritisme ou la modification des\nmotes.\nla\nQuestion 2: Grâce à ses\npropriétés d'immutabilité et de traçabilité, lu\nblockchain enregistre chaque étape : scan de la copie, anonymisation,\ndistribution aux correcteurs et mote finale. Sur SUI, chaque opération\ndevient une transaction vérifiable. Resultat: aucune\nfraude possible,\ntransparence totale et con\nconfiance assurée\nQuestion 3: Avantages pour les étudiants sont l'anonymat garanti, l'équité et\nla confiance dans le résultat. Les avantages pour les professeurs sont du\ngain de temps, moins de\nLes avantages pour\npaperasse, archive automatique et plus encore\nl'université sont une réduction des couûts, une sécurité\naccrue (pas de vol, perte ou manipulation des copies), réputation innovante et\nmodernisé vis-à-vis du public, une équité entre les étudiants\ndémontrable et enfin\nune scalabilité améliorée.\nqui\nest",
};

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<any>(sample_result);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(sample_result.text);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const packageId = useNetworkVariable("counterPackageId");
  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();
  const studentCapQuery = getOwnedObjects([{ StructType: STUDENT_CAP_TYPE }]);
  const studentCap =
    studentCapQuery && studentCapQuery.length > 0 ? studentCapQuery[0] : "";

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setError("");
    setSelectedImage(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    setError("");
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Add any additional data you want to send
      formData.append("fileName", selectedImage.name);
      formData.append("fileSize", selectedImage.size.toString());

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();
      setUploadResult(result);
      setEditedText(result.text);

      // clearImage();
    } catch (err) {
      setError((err as Error).message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!editedText.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {  
      const tx = new Transaction();

      tx.moveCall({
        target: `${packageId}::ChainExam::send_exam`,
        arguments: [tx.object(String(studentCap)), tx.pure.string(editedText)],
      });
      signAndExecute({
        transaction: tx,
      });
    } catch (err) {
      console.log(err);
      setError("Submit failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setUploadResult(null);
    setEditedText("");
    setError("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-3/5 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold p-5 text-center mb-6 text-gray-800">
        Upload you exam
      </h2>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : selectedImage
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {!selectedImage ? (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-gray-600 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-10">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
              />
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{selectedImage.name}</p>
              <p>{(selectedImage.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        )}
      </div>

      <div className="pt-5">
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {/* Upload Button */}
        {selectedImage && !uploadResult && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full mt-4 px-4 py-2 bg-blue-500  text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing Image...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Process Image
              </>
            )}
          </button>
        )}
      </div>

      {/* Text Editor */}
      {uploadResult && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 p-5 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Text Extracted Successfully!</span>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-100 rounded-t-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <Edit3 className="h-4 w-4" />
                <span className="font-medium text-sm">
                  Review & Edit Transcribed Text
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {editedText.length} characters
              </span>
            </div>

            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full h-64 p-4 border-0 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white rounded-b-lg text-sm leading-relaxed"
              placeholder="Edit the transcribed text here..."
            />
          </div>

          <div className="flex gap-3 pt-10">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !editedText.trim()}
              className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Final Text
                </>
              )}
            </button>

            <button
              onClick={clearImage}
              className="px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-s p-10 text-gray-500 space-y-1">
        <p>
          <strong>Instructions:</strong>
        </p>
        <p>• Make sure that the image is clear and not blurred</p>
        <p>• Don't exceed max size of 5MB</p>
        <p>• Don't include any personal information</p>
        <p>• Review and edit the transcribed text before submitting</p>
      </div>
    </div>
  );
}
