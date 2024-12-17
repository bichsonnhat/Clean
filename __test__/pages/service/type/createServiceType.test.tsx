/**
 * @jest-environment node
 */
import { POST } from "@/app/(api)/(routes)/api/service-types/route";
import prisma from "@/lib/db"; // Adjust import path
import { Decimal } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

// Mock prisma and NextResponse
jest.mock("@/lib/db", () => ({
  __esModule: true, // Nếu module được export với `export default`
  default: {
    serviceCategory: {
      findUnique: jest.fn(),
    },
    serviceType: {
      create: jest.fn(),
    },
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, ...init })),
  },
}));

const mockServiceCategory = {
  id: "4a961bfb-4ffd-45a7-9291-09471fb19470",
  name: "Mock Service Type",
  description: "A mock service type for testing",
  createdAt: new Date(),
  isActive: true,
};

describe("Create Service Type", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("UTCID01", async () => {
    const mockRequestBody = {
      categoryId: "4a961bfb-4ffd-45a7-9291-09471fb19470",
      name: null,
      description: "abc97thvbghd",
      basePrice: 0,
      createdAt: new Date(),
      isActive: true,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceCategory.findUnique as jest.Mock).mockResolvedValue(
      mockServiceCategory
    );

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(400);

    expect(response.data).toEqual({
      status: "error",
      error: "Name cannot be empty",
    });
  });

  it("UTCID02", async () => {
    const mockRequestBody = {
      categoryId: "4a961bfb-4ffd-45a7-9291-09471fb19470",
      name: "Clean type",
      description: "abc97thvbghd",
      basePrice: 50,
      createdAt: new Date(),
      isActive: true,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceCategory.findUnique as jest.Mock).mockResolvedValue(
      mockServiceCategory
    );

    (prisma.serviceType.create as jest.Mock).mockResolvedValue(mockRequestBody);

    const response = (await POST(mockRequest)) as any;

    expect(response.data).toEqual(mockRequestBody);
  });

  it("UTCID03", async () => {
    const mockRequestBody = {
      categoryId: null,
      name: null,
      description: "abc97thvbghd",
      basePrice: 50,
      createdAt: new Date(),
      isActive: true,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceCategory.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service Category not found",
    });
  });

  it("UTCID04", async () => {
    const mockRequestBody = {
      categoryId: null,
      name: "Clean type",
      description: "abc97thvbghd",
      basePrice: -1,
      createdAt: new Date(),
      isActive: true,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceCategory.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service Category not found",
    });
  });

  it("UTCID05", async () => {
    const mockRequestBody = {
      categoryId: null,
      name: "Clean type",
      description: "abc97thvbghd",
      basePrice: 0,
      createdAt: new Date(),
      isActive: true,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceCategory.findUnique as jest.Mock).mockResolvedValue(null);

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(404);

    expect(response.data).toEqual({
      status: "error",
      error: "Service Category not found",
    });
  });

  it("UTCID06", async () => {
    const mockRequestBody = {
      categoryId: "4a961bfb-4ffd-45a7-9291-09471fb19470",
      name: null,
      description: "abc97thvbghd",
      basePrice: -1,
      createdAt: new Date(),
      isActive: true,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as Request;

    // Mock prisma to return null for service type
    (prisma.serviceCategory.findUnique as jest.Mock).mockResolvedValue(
      mockServiceCategory
    );

    const response = (await POST(mockRequest)) as any;

    expect(response.status).toBe(400);

    expect(response.data).toEqual({
      status: "error",
      error: "Base price cannot be negative",
    });
  });
});
