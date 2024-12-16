import { render, screen, fireEvent } from "@testing-library/react";
import OrderTable from "@/components/order/OrderTable";
import SearchBar from "@/components/order/SearchBar";
import Pagination from "@/components/order/Pagination";

// Mock các thành phần con
jest.mock("@/components/order/SearchBar", () => ({
  __esModule: true,
  default: jest.fn(({ setSearchTerm, setSearchBy }) => (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={(e) => setSearchTerm(e.target.value)} // Đặt giá trị khi input thay đổi
      />
      <select
        data-testid="search-by-select"
        onChange={(e) => setSearchBy(e.target.value)} // Đặt giá trị khi select thay đổi
      >
        <option value="Customer">Customer</option>
        <option value="Helper">Helper</option>
        <option value="Rating">Rating</option>
        <option value="Price">Price</option>
        <option value="Status">Status</option>
      </select>
    </div>
  )),
}));

jest.mock("@/components/order/Pagination", () => ({
  __esModule: true,
  default: jest.fn(
    ({
      currentPage,
      totalItems,
      totalPages,
      onPageChange,
    }: {
      currentPage: number;
      totalItems: number;
      totalPages: number;
      onPageChange: (page: number) => void;
    }) => (
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          {totalItems === 0
            ? "Showing 0 items"
            : currentPage === 1
            ? `Showing 1 - 10 of ${totalItems} items`
            : currentPage === 2
            ? `Showing 11 - 20 of ${totalItems} items`
            : `Showing 21 - 30 of ${totalItems} items`}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    )
  ),
}));

jest.mock("@/components/order/OrderRow", () => ({
  __esModule: true,
  default: ({
    customerName,
    location,
    totalPrice,
  }: {
    customerName: string;
    location: string;
    totalPrice: number;
  }) => (
    <div>
      <span>{customerName}</span>
      <span>{location}</span>
      <span>{totalPrice}</span>
    </div>
  ),
}));

describe("OrderTable", () => {
  it("renders the component", () => {
    render(<OrderTable />);

    expect(SearchBar).toHaveBeenCalled();
    expect(Pagination).toHaveBeenCalled();

    expect(screen.getByText("CUSTOMER")).toBeInTheDocument();
    expect(screen.getByText("HELPER")).toBeInTheDocument();
    expect(screen.getByText("ADDRESS")).toBeInTheDocument();
    expect(screen.getByText("TIME")).toBeInTheDocument();
    expect(screen.getByText("RATING")).toBeInTheDocument();
    expect(screen.getByText("PRICE")).toBeInTheDocument();
    expect(screen.getByText("STATUS")).toBeInTheDocument();

    const customerColumn = screen.getByText("CUSTOMER").closest("div");
    expect(customerColumn).toHaveClass("w-[130px]");
    expect(customerColumn).toHaveClass("flex-[3]");

    const helperColumn = screen.getByText("HELPER").closest("div");
    expect(helperColumn).toHaveClass("w-[130px]");
    expect(helperColumn).toHaveClass("flex-[3]");

    const addressColumn = screen.getByText("ADDRESS").closest("div");
    expect(addressColumn).toHaveClass("w-[250px]");
    expect(addressColumn).toHaveClass("flex-[5]");

    const timeColumn = screen.getByText("TIME").closest("div");
    expect(timeColumn).toHaveClass("w-[130px]");
    expect(timeColumn).toHaveClass("flex-[3]");

    const ratingColumn = screen.getByText("RATING").closest("div");
    expect(ratingColumn).toHaveClass("w-[120px]");
    expect(ratingColumn).toHaveClass("flex-[3]");

    const priceColumn = screen.getByText("PRICE").closest("div");
    expect(priceColumn).toHaveClass("w-[120px]");
    expect(priceColumn).toHaveClass("flex-[2]");

    const statusColumn = screen.getByText("STATUS").closest("div");
    expect(statusColumn).toHaveClass("w-[120px]");
    expect(statusColumn).toHaveClass("flex-[3]");
  });

  it("handle search by customer name", () => {
    render(<OrderTable />);

    // Nhập tên khách hàng vào ô tìm kiếm
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "John" },
    });

    // Kiểm tra chỉ đơn hàng của John Doe hiển thị
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alice Smith/i)).toBeNull();
    expect(screen.queryByText(/Charlie Johnson/i)).toBeNull();
  });

  it("handle change the search criteria", () => {
    render(<OrderTable />);

    // Chọn "Status" để tìm kiếm theo trạng thái
    fireEvent.change(screen.getByTestId("search-by-select"), {
      target: { value: "Status" },
    });

    // Kiểm tra xem tiêu đề của lựa chọn hiện tại có thay đổi không
    expect(screen.getByTestId("search-by-select")).toHaveValue("Status");
  });

  it("should render pagination and allow page change", () => {
    render(<OrderTable />);

    expect(screen.getByText(/Showing 1 - 10 of 31 items/i)).toBeInTheDocument();

    expect(screen.getByText(/Prev/i)).toBeDisabled();

    fireEvent.click(screen.getByText(/Next/i));

    expect(
      screen.getByText(/Showing 11 - 20 of 31 items/i)
    ).toBeInTheDocument();
  });
});
