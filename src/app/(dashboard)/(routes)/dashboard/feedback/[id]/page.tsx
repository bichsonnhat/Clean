"use client";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuArrowLeft } from "react-icons/lu";
import Image from "next/image";
import { Feedback2 } from "@/components/feedback/FeedbackTable";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { IoWarningOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Booking, User } from "@prisma/client";

const FeedbackDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [detail, setDetail] = useState<Feedback2 | null>(null);
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const [warning, setWarning] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<{
    role: string,
    userId: string
  } | null>(null);
  useEffect(() => {
    const fetchDetail = async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${id}`
      );
      const data = await response.json();
      setDetail(data);
      const bookingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${data.booking_id}`
      )
      const bookingData = await bookingResponse.json();
      setBooking(bookingData);
    };

    const fetchRole = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-info`
      )
      const data = await response.json();
      setAdminUser(data);
    }

    fetchDetail(params.id);
    fetchRole();
  }, [params.id]);

  useEffect(() => {
      const fetchUser = async (id: string) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
        );
        const data = await response.json();
        setUser(data);
      }
      if (booking) {
        fetchUser(booking.helperId ?? "");
      }
    }, [booking]);

  const router = useRouter();

  const logo = [
    {
      logo: "/images/Dashboard/Feedback/Clean.svg",
    },
    {
      logo: "/images/About/UIT.svg",
    },
  ];

  const sentiment =
    detail && detail.helperRating > 3
      ? "Positive"
      : detail && detail.helperRating < 3
      ? "Negative"
      : "Neutral";
  const sentimentColor =
    sentiment === "Positive"
      ? "bg-[#ccf0eb] text-[#00b69b]"
      : sentiment === "Negative"
      ? "bg-[#fcd7d4] text-[#ef3826]"
      : "bg-[#ccd0d9] text-[#2b3641]";

  const formatDate = (date: string) => {
    const newDate = new Date(date);

    const hours = newDate.getHours().toString().padStart(2, "0");
    const minutes = newDate.getMinutes().toString().padStart(2, "0");

    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  const handleDeleteFeedback = async () => {
    try {
      setDeleting(true);
      // await Promise.all(
      //   checkedRows.map((id) => {
      //     return fetch(
      //       `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${id}`,
      //       {
      //         method: "DELETE",
      //       }
      //     );
      //   })
      // );
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${id}`, {
        method: "DELETE",
      });

      toast({ title: "Delete feedback successfully!" });
      console.log("Delete feedback successfully!");
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete some feedback",
      });
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };
  const handleBlacklistedUser = async () => {
    const body = {
      userId: booking?.helperId,
      reason: "user has 3 warnings",
      blacklistedBy: booking?.customerId,
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blacklisted_users`, {
      method: "POST",
      headers: {
        application: "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json()).then((data) => console.log(data));
  }

  const handleWarningUser = async () => {
    try {
      const bodyUser = {
        nunmberOfViolations: (user?.numberOfViolations ?? 0) + 1,
      }
      if (bodyUser.nunmberOfViolations == 3) {
        handleBlacklistedUser();
      }
      const bodyFeedback = {
        resolveBy: adminUser?.userId,
      }
      setWarning(true);
      // await Promise.all(
      //   checkedRows.map((id) => {
      //     return fetch(
      //       `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${id}`,
      //       {
      //         method: "DELETE",
      //       }
      //     );
      //   })
      // );
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${booking?.helperId}`, {
        method: "PATCH",
        headers: {
          application: "application/json",
        },
        body: JSON.stringify(bodyUser),
      }).then((res) => res.json()).then((data) => console.log(data));

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${id}`, {
        method: "PATCH",
        headers: {
          application: "application/json",
        },
        body: JSON.stringify(bodyFeedback),
      }).then((res) => res.json()).then((data) => console.log(data));

      toast({ title: "Warning helper successfully!" });
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to warning helper",
      });
      console.error(error);
    } finally {
      setWarning(false);
    }
  };
  if (!detail)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:max-w-full">
      <div className="flex flex-col w-full rounded max-md:max-w-full pb-6">
        {/* Begin Title */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start ">
            <button
              onClick={() => router.back()}
              className="h-full p-6 hover:bg-slate-200 border-r-[1px]"
            >
              <LuArrowLeft className="h-[19px] text-neutral-300 text-xl font-bold" />
            </button>

            {/* <div className="flex-1 max-w-[200px] min-w-10">
              <p className="truncate px-3 py-5 ml-5 min-h-[48px] w-full font-Averta-Bold text-base lg:text-lg">
                {detail?.title}
              </p>
            </div> */}

            <div className="flex flex-col grow shrink justify-center pl-6 text-xs font-bold text-center whitespace-nowrap w-[125px]">
              <div className="flex overflow-hidden flex-1 items-center size-full">
                <div className="flex flex-col self-stretch my-auto w-[93px]">
                  <div
                    className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${sentimentColor} rounded-md`}
                  >
                    <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                      {sentiment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            {adminUser?.role === 'admin' && !detail.resolveBy && (
              <AlertDialog>
                <AlertDialogTrigger>
                  {warning ? (
                    <div className="flex flex-row gap-2 items-center justify-center px-4 lg:px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
                      <ClipLoader color="#fff" loading={true} size={30} />
                    </div>
                  ) : (
                    <div className="h-full p-6 hover:bg-slate-200">
                      <IoWarningOutline size={25} className="h-[19px]" />
                    </div>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This action will warning the 
                      helper.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <button
                        onClick={() => handleWarningUser()}
                        // onClick={() => {
                        //   toast({ title: "Delete issue successfully!" });
                        // }}
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        Warning
                      </button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              )}
            {/* <button className="h-full p-6 hover:bg-slate-200">
              <FaRegTrashAlt className="h-[19px]" />
            </button> */}
            <AlertDialog>
              <AlertDialogTrigger>
                {deleting ? (
                  <div className="flex flex-row gap-2 items-center justify-center px-4 lg:px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
                    <ClipLoader color="#fff" loading={true} size={30} />
                  </div>
                ) : (
                  <div className="h-full p-6 hover:bg-slate-200">
                    <FaRegTrashAlt className="h-[19px]" />
                  </div>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This action will delete the
                    feedback.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button
                      onClick={() => handleDeleteFeedback()}
                      // onClick={() => {
                      //   toast({ title: "Delete issue successfully!" });
                      // }}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>  
        </div>
        {/* End Title */}

        {/* Begin Sender info */}
        <div className="flex flex-row items-center justify-between py-3 px-5">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/images/Dashboard/Header/Avatar.png"
              alt="Avatar"
              width={100}
              height={100}
              className="object-contain filter h-[50px] w-auto lg:h-[60px]"
            />
            <div className="flex flex-row self-stretch items-center mx-4">
              <p className=" font-bold font-Averta-Semibold text-base lg:text-lg mr-1">
                {detail.booking.customer.fullName}
              </p>
              <p className="text-[10px] lg:text-xs font-semibold text-neutral-600 font-Averta-Regular mt-0.5">
                {"<customer>"}
              </p>
            </div>
          </div>

          <p className=" py-4 font-Averta-Regular text-xs lg:text-sm text-gray-400">
            {formatDate(detail.created_at)}
          </p>
        </div>
        {/* End Sender info */}

        {/* Begin Content */}
        <div className="flex flex-col w-full h-fit lg:px-16 lg:py-8">
          <p className="overflow-hidden self-stretch px-3 py-5 w-full lg:ml-5 min-h-[48px] font-Averta-Bold text-xl lg:text-2xl">
            {" "}
            {detail.title}
          </p>
          <p className="overflow-hidden self-stretch px-3 py-5 w-full lg:ml-5 min-h-[48px] font-Averta-Regular text-sm lg:text-base">
            {detail.description}
          </p>
        </div>
        {/* End  Content*/}

        {/* Logo */}
        <div className="flex flex-row items-center justify-center gap-8 w-full h-[100px]">
          {logo.map((items) => (
            <div key={items.logo} className="flex items-center justify-center">
              <div className="relative flex items-center w-full h-[30px] lg:h-[50px]">
                <Image
                  src={items.logo}
                  alt="ClientLogo"
                  width={100}
                  height={100}
                  className="object-contain filter h-[30px] w-auto lg:h-[40px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
