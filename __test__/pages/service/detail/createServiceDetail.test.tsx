/**
 * @jest-environment node
 */
import { POST } from "@/app/(api)/(routes)/api/service-detail/route";
import prisma from "@/lib/db"; // Adjust import path
import { Decimal } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

// Mock prisma and NextResponse
jest.mock("@/lib/db", () => ({
  __esModule: true, // Nếu module được export với `export default`
  default: {
    serviceType: {
      findUnique: jest.fn(),
    },
    serviceDetail: {
      create: jest.fn(),
    },
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, ...init })),
  },
}));

const mockServiceType = {
  id: "4a961bfb-4ffd-45a7-9291-09471fb19470",
  categoryId: "dummy-category-id",
  name: "Mock Service Type",
  description: "A mock service type for testing",
  basePrice: new Decimal(200),
  createdAt: new Date(),
  isActive: true,
};

describe("Create Service Detail", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("UTCID01", async () => {
    const mockRequestBody = {
      serviceTypeId: "4a961bfb-4ffd-45a7-9291-09471fb19470",
      title: "Half DAy",
      multiplyPrice: -1,
      additionalPrice: 0,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(
      mockServiceType
    );

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(400);

    expect(response.data).toEqual({
      status: "error",
      error: "Multiply price must be greater than or equal to 1",
    });
  });

  it("UTCID02", async () => {
    const mockRequestBody = {
      serviceTypeId: "4a961bfb-4ffd-45a7-9291-09471fb19470",
      title: "b",
      multiplyPrice: 0,
      additionalPrice: -10,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(
      mockServiceType
    );

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(400);

    expect(response.data).toEqual({
      status: "error",
      error: "Additional price must be greater than or equal to 0",
    });
  });

  it("UTCID03", async () => {
    const mockRequestBody = {
      serviceTypeId: "4a961bfb-4ffd-45a7-9291-09471fb19470",
      title: null,
      multiplyPrice: 2,
      additionalPrice: 50,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(
      mockServiceType
    );

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(400);

    expect(response.data).toEqual({
      status: "error",
      error: "Title cannot be empty",
    });
  });

  it("UTCID04", async () => {
    const mockRequestBody = {
      serviceTypeId: "abc97thvbghd",
      title: "b",
      multiplyPrice: 2,
      additionalPrice: 0,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service type not found",
    });
  });

  it("UTCID05", async () => {
    const mockRequestBody = {
      serviceTypeId: "abc97thvbghd",
      title: null,
      multiplyPrice: -1,
      additionalPrice: -10,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service type not found",
    });
  });

  it("UTCID06", async () => {
    const mockRequestBody = {
      serviceTypeId: "abc97thvbghd",
      title: "Half DAy",
      multiplyPrice: 0,
      additionalPrice: 50,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service type not found",
    });
  });

  it("UTCID07", async () => {
    const mockRequestBody = {
      serviceTypeId: null,
      title: null,
      multiplyPrice: 0,
      additionalPrice: 0,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service type not found",
    });
  });

  it("UTCID08", async () => {
    const mockRequestBody = {
      serviceTypeId: null,
      title: "Half DAy",
      multiplyPrice: 2,
      additionalPrice: -10,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service type not found",
    });
  });

  it("UTCID09", async () => {
    const mockRequestBody = {
      serviceTypeId: null,
      title: "b",
      multiplyPrice: -1,
      additionalPrice: 50,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceType.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service type not found",
    });
  });
});
