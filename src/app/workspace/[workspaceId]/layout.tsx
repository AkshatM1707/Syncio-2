import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <div className="flex-1 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
