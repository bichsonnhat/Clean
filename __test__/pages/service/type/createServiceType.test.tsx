import { createServiceType } from "@/components/popup/CreateServiceTypePopup"; // Update import path
import { createServiceTypeData } from "@/schema/serviceTypeSchema";

// Mock the global fetch function
global.fetch = jest.fn();

describe("createServiceType", () => {
  const createServiceTypeUrl = "http://localhost:3000/api/service-types";

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should successfully create a service type", async () => {
    // Prepare test data
    const mockServiceTypeData: createServiceTypeData = {
      categoryId: "1",
      name: "Test Service Type",
      basePrice: 100,
      description: "A test service type description",
    };

    // Mock a successful response
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ id: 1, ...mockServiceTypeData }),
    };

    // Mock fetch to return the mock response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      mockResponse as any
    );

    // Spy on console methods
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Call the function
    await createServiceType(mockServiceTypeData);

    // Verify fetch was called with correct arguments
    expect(fetch).toHaveBeenCalledWith(createServiceTypeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockServiceTypeData),
    });

    // Verify console methods were called
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        ...mockServiceTypeData,
      })
    );

    // Restore console methods
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("should handle error when service type creation fails", async () => {
    // Prepare test data
    const mockServiceTypeData: createServiceTypeData = {
      categoryId: "1",
      name: "Test Service Type",
      basePrice: 100,
      description: "A test service type description",
    };

    // Mock a failed response
    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    // Mock fetch to return the error response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      mockErrorResponse as any
    );

    // Spy on console error
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Call the function and expect it to handle the error without throwing
    await createServiceType(mockServiceTypeData);

    // Verify fetch was called with correct arguments
    expect(fetch).toHaveBeenCalledWith(createServiceTypeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockServiceTypeData),
    });

    // Verify console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error creating service type:",
      expect.any(Error)
    );

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it("should handle network errors", async () => {
    // Prepare test data
    const mockServiceTypeData: createServiceTypeData = {
      categoryId: "1",
      name: "Test Service Type",
      basePrice: 100,
      description: "A test service type description",
    };

    // Mock a network error
    const networkError = new Error("Network Error");
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      networkError
    );

    // Spy on console error
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Call the function and expect it to handle the error without throwing
    await createServiceType(mockServiceTypeData);

    // Verify fetch was called with correct arguments
    expect(fetch).toHaveBeenCalledWith(createServiceTypeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockServiceTypeData),
    });

    // Verify console.error was called with the network error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error creating service type:",
      networkError
    );

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
