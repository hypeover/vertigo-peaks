import GpxViewer from "./gpx-viewer";

export default function Page() {
  return (
    <div className="flex min-h-svh p-6 justify-center items-center">
      <div className="flex justify-center items-center max-w-md min-w-200 flex-col gap-4 text-sm leading-loose">
        <GpxViewer />
        <div className="font-mono text-xs text-muted-foreground fixed left-2 bottom-5">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}