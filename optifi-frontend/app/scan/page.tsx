"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, FileText } from "lucide-react";
import ReceiptScanner from "@/components/ReceiptScanner";

export default function ScanPage() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Scan Receipts
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload or take a photo of your receipt to automatically extract
            expense data using our advanced OCR technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg mb-2">Take Photo</CardTitle>
            <p className="text-slate-600 text-sm">
              Use your camera to capture receipts instantly
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg mb-2">Upload Image</CardTitle>
            <p className="text-slate-600 text-sm">
              Upload existing receipt photos from your device
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg mb-2">Auto Extract</CardTitle>
            <p className="text-slate-600 text-sm">
              AI-powered text extraction and categorization
            </p>
          </Card>
        </div>

        {/* Scan Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowScanner(true)}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Scanning
          </Button>
        </div>

        {/* Tips Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">📸 Photo Quality</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Ensure good lighting</li>
                    <li>• Keep receipt flat and in focus</li>
                    <li>• Avoid shadows and glare</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    📋 Receipt Requirements
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Clear merchant name and date</li>
                    <li>• Visible total amount</li>
                    <li>• Supported formats: JPG, PNG</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receipt Scanner Modal */}
      {showScanner && <ReceiptScanner onClose={() => setShowScanner(false)} />}
    </div>
  );
}
