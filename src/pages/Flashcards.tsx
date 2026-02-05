import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ChevronRight } from "lucide-react";

export default function Flashcards() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Study with AI-generated flashcards
        </p>
      </div>

      <Card className="rounded-2xl border border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Get Started
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select a course and generate flashcards from your uploaded documents. Use spaced repetition for effective learning.
          </p>
        </CardHeader>
        <CardContent>
          <Link to="/dashboard">
            <Button>
              Go to Dashboard
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Create a course, upload documents, then use the Flashcards tab in the course to generate flashcards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
