import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1>Hello there</h1>

      <Dialog>
        <DialogTrigger>Open modal</DialogTrigger>

        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia
          ut! Ut repellendus excepturi saepe explicabo laboriosam reprehenderit,
          sapiente earum illum ratione dolorum molestias nesciunt, autem ipsum
          ipsa corrupti? Amet?
        </DialogContent>
      </Dialog>
    </main>
  );
}
