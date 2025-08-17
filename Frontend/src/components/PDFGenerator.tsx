import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Settings } from 'lucide-react';

const PDFGenerator = () => {
  const handleGeneratePDF = () => {
    // This would normally connect to a backend service to generate PDF
    // For demonstration, we'll show what the interface would look like
    alert('PDF generation would happen here with backend integration');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          CV PDF Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Template Style</label>
            <select className="w-full p-2 border rounded-md">
              <option>Modern Professional</option>
              <option>Classic Traditional</option>
              <option>Creative Designer</option>
              <option>Technical Developer</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Sections to Include</label>
            <div className="space-y-2">
              {['Personal Info', 'Skills', 'Projects', 'Experience', 'Education'].map((section) => (
                <label key={section} className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">{section}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGeneratePDF} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Generate PDF
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Customize
          </Button>
        </div>

        <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
          <strong>Note:</strong> PDF generation requires backend integration with a service like Puppeteer, jsPDF, or PDFKit. 
          The generated CV will include all your current portfolio data from the database.
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFGenerator;