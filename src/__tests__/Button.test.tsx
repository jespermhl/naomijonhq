import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders as a button by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("renders as an anchor when href is provided", () => {
    render(<Button href="/test">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("adds target=_blank for external links", () => {
    render(<Button href="https://example.com">External</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not force blank for internal links", () => {
    render(<Button href="/about">Internal</Button>);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("text-xs");

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole("button").className).toContain("text-lg");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button").className).toContain("custom-class");
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards additional anchor props", () => {
    render(
      <Button href="/download" download="file.pdf">
        Download
      </Button>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("download", "file.pdf");
  });
});
