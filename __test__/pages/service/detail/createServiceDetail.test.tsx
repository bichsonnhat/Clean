import { createServiceDetailData } from "@/schema/serviceDetailSchema";
import { createServiceDetail } from "@/components/popup/CreateServiceDetailPopup";

// Mock the global fetch function
global.fetch = jest.fn();

describe("createServiceDetail", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should successfully create a service detail", async () => {
    // Prepare test data
    const mockServiceDetailData: createServiceDetailData = {
      serviceTypeId: "1",
      title: "Test Service Detail",
      multiplyPrice: 2,
      additionalPrice: 50,
    };

    // Mock a successful response
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ id: 1, ...mockServiceDetailData }),
    };

    // Mock fetch to return the mock response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      mockResponse as any
    );

    // Spy on console.log
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    // Expect the function to resolve without throwing
    await expect(createServiceDetail(mockServiceDetailData)).resolves.toEqual({
      id: 1,
      ...mockServiceDetailData,
    });

    // Verify fetch was called with correct arguments
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/service-detail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockServiceDetailData),
      }
    );

    // Verify console.log was called
    expect(consoleLogSpy).toHaveBeenCalledWith({
      id: 1,
      ...mockServiceDetailData,
    });

    // Restore console.log
    consoleLogSpy.mockRestore();
  });

  it("should handle errors when creating a service detail", async () => {
    // Prepare test data
    const mockServiceDetailData: createServiceDetailData = {
      serviceTypeId: "1",
      title: "Test Service Detail",
      multiplyPrice: 2,
      additionalPrice: 50,
    };

    // Mock an error response
    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    // Mock fetch to return the error response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      mockErrorResponse as any
    );

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Expect the function to throw an error
    await expect(createServiceDetail(mockServiceDetailData)).rejects.toThrow(
      "Error creating service detail"
    );

    // Verify fetch was called with correct arguments
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/service-detail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockServiceDetailData),
      }
    );

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
