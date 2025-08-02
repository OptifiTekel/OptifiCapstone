"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  X,
  Camera,
  FileText,
  Edit3,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface ReceiptScannerProps {
  onClose: () => void;
}

interface ExtractedData {
  merchant: string;
  date: string;
  total: string;
  items: Array<{
    description: string;
    amount: string;
  }>;
  rawText: string;
}

export default function ReceiptScanner({ onClose }: ReceiptScannerProps) {
  const [step, setStep] = useState<
    "upload" | "processing" | "edit" | "categorize"
  >("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [editableData, setEditableData] = useState<ExtractedData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hiddenItemsCount, setHiddenItemsCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Bills & Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Travel",
    "Other",
  ];

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Removed web camera functionality - now using native camera only

  // Removed camera capture and stop functions - using native camera only

  const processReceipt = async () => {
    if (!selectedFile) return;

    setStep("processing");
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Simulate OCR processing with progress
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      clearInterval(progressInterval);
      setProcessingProgress(100);

      // Mock OCR extracted data - replace with actual OCR API
      const mockExtractedData: ExtractedData = {
        merchant: "Grocery Store Plus",
        date: "2025-01-15",
        total: "3,372.50",
        items: [
          { description: "Organic Bananas", amount: "249.50" },
          { description: "Whole Milk", amount: "174.50" },
          { description: "Chicken Breast", amount: "649.50" },
          { description: "Fresh Bread", amount: "149.50" },
          { description: "Mixed Vegetables", amount: "299.50" },
          { description: "Greek Yogurt", amount: "349.50" },
          { description: "Tax", amount: "150.50" },
        ],
        rawText: `GROCERY STORE PLUS
123 Main St, Metro Manila
Tel: (02) 123-4567

Date: 01/15/2025
Time: 14:32

Organic Bananas         ₱249.50
Whole Milk              ₱174.50
Chicken Breast         ₱649.50
Fresh Bread             ₱149.50
Mixed Vegetables        ₱299.50
Greek Yogurt            ₱349.50

Subtotal               ₱1,822.00
Tax                     ₱150.50
Total                  ₱3,372.50

Thank you for shopping!`,
      };

      setExtractedData(mockExtractedData);
      setEditableData({ ...mockExtractedData });
      setStep("edit");
    } catch (error) {
      console.error("OCR processing failed:", error);
      alert("Failed to process receipt. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDataEdit = (field: keyof ExtractedData, value: string) => {
    if (editableData) {
      setEditableData((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  const handleItemEdit = (
    index: number,
    field: "description" | "amount",
    value: string
  ) => {
    if (editableData) {
      const newItems = [...editableData.items];
      newItems[index] = { ...newItems[index], [field]: value };
      setEditableData((prev) => (prev ? { ...prev, items: newItems } : null));
    }
  };

  const addNewItem = () => {
    if (editableData) {
      const newItems = [...editableData.items, { description: "", amount: "" }];
      setEditableData((prev) => (prev ? { ...prev, items: newItems } : null));
    }
  };

  const removeItem = (index: number) => {
    if (editableData) {
      const newItems = editableData.items.filter((_, i) => i !== index);
      setEditableData((prev) => (prev ? { ...prev, items: newItems } : null));
    }
  };

  const calculateHiddenItems = () => {
    if (itemsContainerRef.current && editableData) {
      const container = itemsContainerRef.current;
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;

      // Calculate how many items are hidden below
      const itemHeight = 48; // Approximate height of each item row
      const visibleItems = Math.floor(containerHeight / itemHeight);
      const totalItems = editableData.items.length;
      const hiddenBelow = Math.max(0, totalItems - visibleItems);

      // Only show indicator if there are actually hidden items AND we're not at the bottom
      const isAtBottom = scrollTop + containerHeight >= scrollHeight - 10; // 10px tolerance
      const shouldShowIndicator = hiddenBelow > 0 && !isAtBottom;

      setHiddenItemsCount(shouldShowIndicator ? hiddenBelow : 0);
    }
  };

  // Update hidden items count when editableData changes
  useEffect(() => {
    if (editableData) {
      calculateHiddenItems();
    }
  }, [editableData]);

  const proceedToCategorize = () => {
    setStep("categorize");
  };

  const saveTransaction = async () => {
    if (!editableData || !selectedCategory) return;

    try {
      // Here you would save the transaction to your database/API
      const transactionData = {
        ...editableData,
        category: selectedCategory,
        processedAt: new Date().toISOString(),
      };

      console.log("Saving transaction:", transactionData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success and close
      alert("Receipt processed and saved successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to save transaction:", error);
      alert("Failed to save transaction. Please try again.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Receipt Scanner
          </DialogTitle>
        </DialogHeader>

        {/* Upload Step */}
        {step === "upload" && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-slate-600 mb-6">
                Upload a receipt image or take a photo to extract expense data
              </p>
            </div>

            {!selectedFile ? (
              <div className="space-y-4">
                {/* Upload Area */}
                <div
                  className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-slate-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-lg font-medium text-slate-600 mb-2">
                    Select from Gallery
                  </p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 10MB</p>
                  <p className="text-xs text-slate-400 mt-2">
                    Choose from your photos or files
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-slate-500 mb-4">or</p>
                  <Button
                    onClick={() => cameraInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Open Camera
                  </Button>
                  <p className="text-xs text-slate-400 mt-2">
                    Uses your device's camera app
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={previewUrl!}
                    alt="Receipt preview"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    onClick={processReceipt}
                    className="accent-primary hover:accent-primary text-white px-8"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Process Receipt
                  </Button>
                </div>
              </div>
            )}

            {/* Removed camera modal - using native camera only */}
          </div>
        )}

        {/* Processing Step */}
        {step === "processing" && (
          <div className="space-y-6 text-center py-12">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Processing Receipt
              </h3>
              <p className="text-slate-600 mb-4">
                Using OCR to extract text and data from your receipt...
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Progress value={processingProgress} className="h-2 mb-2" />
              <p className="text-sm text-slate-500">
                {processingProgress < 30 && "Analyzing image..."}
                {processingProgress >= 30 &&
                  processingProgress < 70 &&
                  "Extracting text..."}
                {processingProgress >= 70 &&
                  processingProgress < 100 &&
                  "Processing data..."}
                {processingProgress >= 100 && "Complete!"}
              </p>
            </div>
          </div>
        )}

        {/* Edit Step */}
        {step === "edit" && editableData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Review & Edit Extracted Data
              </h3>
              <Badge variant="secondary" className="flex items-center">
                <AlertCircle className="mr-1 h-3 w-3" />
                Please verify accuracy
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Receipt Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="merchant">Merchant</Label>
                    <Input
                      id="merchant"
                      value={editableData.merchant}
                      onChange={(e) =>
                        handleDataEdit("merchant", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={editableData.date}
                      onChange={(e) => handleDataEdit("date", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="total">Total Amount</Label>
                    <Input
                      id="total"
                      type="number"
                      step="0.01"
                      value={editableData.total}
                      onChange={(e) => handleDataEdit("total", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    Items
                    <Button size="sm" onClick={addNewItem}>
                      Add Item
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div
                      ref={itemsContainerRef}
                      className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-4"
                      onScroll={calculateHiddenItems}
                    >
                      {editableData.items.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) =>
                              handleItemEdit(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                          <Input
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            value={item.amount}
                            onChange={(e) =>
                              handleItemEdit(index, "amount", e.target.value)
                            }
                            className="w-24"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {hiddenItemsCount > 0 && (
                      <div className="absolute left-0 -bottom-8 bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                        {hiddenItemsCount} more below
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Raw Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Raw OCR Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={editableData.rawText}
                  onChange={(e) => handleDataEdit("rawText", e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button
                onClick={proceedToCategorize}
                className="accent-primary hover:accent-primary text-white"
              >
                Continue
                <Edit3 className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Categorize Step */}
        {step === "categorize" && editableData && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Categorize Expense</h3>
              <p className="text-slate-600">
                Choose the category that best describes this expense
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Merchant</p>
                    <p className="font-medium">{editableData.merchant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Total Amount</p>
                    <p className="font-medium">₱{editableData.total}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="text-base">
                    Category
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setStep("edit")}>
                Back
              </Button>
              <Button
                onClick={saveTransaction}
                disabled={!selectedCategory}
                className="accent-primary hover:accent-primary text-white"
              >
                <Check className="mr-2 h-4 w-4" />
                Save Transaction
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
