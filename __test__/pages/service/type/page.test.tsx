import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceTypeRow from "@/components/service/type/ServiceTypeRow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServiceTypeTable from "@/components/service/type/ServiceTypeTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("ServiceTypeTable Component", () => {
  const mockOnRowClick = jest.fn();
  const homeCleningServiceType = {
    id: "1",
    name: "Number of Bedrooms",
    description: "Service for counting bedrooms",
    basePrice: 50,
    category: { name: "Home Cleaning" },
    onRowClick: mockOnRowClick,
  };

  const otherServiceType = {
    id: "2",
    name: "Special Service",
    description: "A unique service offering",
    basePrice: 75,
    category: { name: "Other Services" },
    onRowClick: mockOnRowClick,
  };

  beforeEach(() => {
    mockOnRowClick.mockClear();
  });

  it("renders service type rows correctly", () => {
    render(<ServiceTypeRow {...homeCleningServiceType} />);

    expect(screen.getByText("Number of Bedrooms")).toBeInTheDocument();
    expect(
      screen.getByText("Service for counting bedrooms")
    ).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText("Home Cleaning")).toBeInTheDocument();
  });

  it("calls onRowClick when row is clicked", () => {
    render(<ServiceTypeRow {...homeCleningServiceType} />);

    const rowElement = screen.getByText("Number of Bedrooms").closest("div");
    fireEvent.click(rowElement!);

    expect(mockOnRowClick).toHaveBeenCalledWith("1");
  });

  it("applies correct color for Home Cleaning category", () => {
    render(<ServiceTypeRow {...homeCleningServiceType} />);

    const categoryBadge = screen.getByText("Home Cleaning");
    expect(categoryBadge).toHaveClass("bg-[#1A78F2]");
  });

  it("applies correct color for Other Services category", () => {
    render(<ServiceTypeRow {...otherServiceType} />);

    const categoryBadge = screen.getByText("Other Services");
    expect(categoryBadge).toHaveClass("bg-[#00B69B]");
  });

  it("renders mobile-friendly labels for small screens", () => {
    render(<ServiceTypeRow {...homeCleningServiceType} />);

    expect(screen.getByText("NAME:")).toBeInTheDocument();
    expect(screen.getByText("DESCRIPTION:")).toBeInTheDocument();
    expect(screen.getByText("SERVICE CATEGORY:")).toBeInTheDocument();
    expect(screen.getByText("BASE PRICE:")).toBeInTheDocument();
  });
});
