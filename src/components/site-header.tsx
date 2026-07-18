import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Container } from "./general/container"
import { ModeToggle } from "./general/(themes)/theme-toggler"

export function SiteHeader() {
  return (
    <header className="flex py-8 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex  w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <Container>
          <div className="flex justify-between items-center">

          <h1>Documenets</h1>
          <ModeToggle/>
          </div>
        </Container>
      </div>

    </header>
  )
}
