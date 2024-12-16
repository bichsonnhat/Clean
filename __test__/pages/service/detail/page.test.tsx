/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailServiceTable from "@/components/service/detail/DetailServiceTable";
import SearchBarAndFilter from "@/components/service/detail/SearchBarAndFilter";
import Pagination from "@/components/service/detail/Pagination";

// Mock dependencies
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(() => ({
    data: mockServiceDetails,
    isLoading: false,
    error: null,
  })),
  useQueryClient: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

const mockServiceDetails = [
  {
    id: "1",
    serviceTypeId: "Number of Bedroom",
    title: 1,
    additionalPrice: 0,
    multiplyPrice: 1,
    serviceType: {
      name: "Cleaning",
    },
  },
  {
    id: "2",
    serviceTypeId: "Number of Bedroom",
    title: 2,
    additionalPrice: 10,
    multiplyPrice: 2,
    serviceType: {
      name: "Deep Cleaning",
    },
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("DetailServiceTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table with service details", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DetailServiceTable />
      </QueryClientProvider>
    );

    // Check if the table is rendered
    expect(screen.getByText("TYPE")).toBeInTheDocument();
    expect(screen.getByText("TITLE")).toBeInTheDocument();
    expect(screen.getByText("ADDITIONAL PRICE")).toBeInTheDocument();
    expect(screen.getByText("MULTIPLY PRICE")).toBeInTheDocument();
  });

  it("opens update popup when a row is clicked", async () => {
    // Mock the UpdateServiceDetailPopup
    jest.mock("@/components/popup/UpdateServiceDetailPopup", () => ({
      UpdateServiceDetailPopup: jest.fn(() => <div>Update Popup</div>),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <DetailServiceTable />
      </QueryClientProvider>
    );

    await waitFor(async () => {
      const rows = await screen.findAllByTestId("row-wrapper");
      console.log(screen.debug);
      fireEvent.click(rows[0]);
    });

    expect(screen.getByText("Update Service Detail")).toBeInTheDocument();
  });
});

describe("SearchBarAndFilter Component", () => {
  it("renders search input and filter dropdown", () => {
    const mockProps = {
      setSearchTerm: jest.fn(),
      setSearchBy: jest.fn(),
      onFilterChange: jest.fn(),
    };

    render(<SearchBarAndFilter {...mockProps} />);

    // Check for key elements
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Create Detail")).toBeInTheDocument();
  });

  it("handles search input change", () => {
    const mockProps = {
      setSearchTerm: jest.fn(),
      setSearchBy: jest.fn(),
      onFilterChange: jest.fn(),
    };

    render(<SearchBarAndFilter {...mockProps} />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(mockProps.setSearchTerm).toHaveBeenCalledWith("test search");
  });
});

describe("Pagination Component", () => {
  const mockPageChangeHandler = jest.fn();

  const defaultProps = {
    currentPage: 1,
    totalItems: 20,
    totalPages: 2,
    onPageChange: mockPageChangeHandler,
  };

  it("enables/disables navigation buttons correctly", () => {
    render(<Pagination {...defaultProps} />);

    const previousButton = screen.getAllByRole("button")[0];
    const nextButton = screen.getAllByRole("button")[1];

    // Check button states
    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("calls onPageChange when navigation buttons are clicked", () => {
    render(<Pagination {...defaultProps} />);

    const nextButton = screen.getAllByRole("button")[1];
    fireEvent.click(nextButton);

    expect(mockPageChangeHandler).toHaveBeenCalledWith(2);
  });
});
