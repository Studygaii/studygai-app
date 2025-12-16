import { Plus, MoreHorizontal, BookOpen } from "lucide-react";

const courses = [
  { id: 1, name: "Calculus II", progress: 65, color: "bg-primary" },
  { id: 2, name: "Biology 101", progress: 42, color: "bg-accent" },
  { id: 3, name: "History of Art", progress: 88, color: "bg-warning" },
  { id: 4, name: "Computer Science", progress: 23, color: "bg-success" },
  { id: 5, name: "Physics", progress: 51, color: "bg-info" },
  { id: 6, name: "Economics", progress: 12, color: "bg-destructive" },
];

export function MyCoursesSection() {
  return (
    <section className="border border-border rounded-2xl p-5 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg">My Courses</h2>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">View all →</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <button
            key={course.id}
            className="group border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-sm transition-all text-left bg-background"
          >
            <div className={`h-10 w-10 rounded-lg ${course.color} flex items-center justify-center mb-3`}>
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${course.color} rounded-full transition-all`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{course.progress}%</span>
            </div>
          </button>
        ))}
        
        {/* Add Course Button */}
        <button className="border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 hover:bg-muted/50 transition-all flex flex-col items-center justify-center min-h-[120px]">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">Add Course</span>
        </button>
      </div>
    </section>
  );
}
