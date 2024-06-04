import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/input/input";
import StarOutlined from "@mui/icons-material/StarOutlined";

interface AddReviewsProps {
  course: any | null;
  
}

const AddReviews: React.FC<AddReviewsProps> = ({ course }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [newRating, setNewRating] = useState(course?.rating);


  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      courseId: course?.id,
    }
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  }

  

  useEffect(() => {
    if (ratingValue && course?.reviews.length) {
      const updatedRating = ((course.rating * course.reviews.length) + ratingValue) / (course.reviews.length + 1);
      setNewRating(updatedRating);
    }
  }, [ratingValue, course]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!course?.isReviewed) {
      setLoading(true);
      try {
        await axios.post('/api/reviews', data);
        toast.success("Review created successfully");
        await axios.put(`/api/course/${course.id}/update/rate`, { rating: newRating });
        router.refresh();
        reset();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  }

  if (!course) {
    return null;
  }

  return (
    <>
      {!course?.isReviewed &&
        <div className="p-4 ">
          <Heading title="Rate This Course" />
          <div className="flex flex-col mt-4 gap-2">
            <Rating
              size="large"
              precision={0.5}
              onChange={(event, newValue) => {
                setCustomValue("rating", newValue);
                setRatingValue(newValue);
              }}
              emptyIcon={
                <StarOutlined fontSize="inherit" className="text-gray-200 dark:text-gray-600" />
              }
            />
            {ratingValue ?
              <div className="flex w-full gap-1 mt-2">
                <div className="w-11/12">
                  <Input
                    id="comment"
                    label="Write Your Comment"
                    required
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="text"
                  />
                </div>
                <div className="flex pt-4 justify-center items-center">
                  {course?.isUser ?
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="text-gray-500 dark:text-gray-400 font-bold hover:text-blue-500 hover:dark:text-blue-400 transition duration-300"
                    >
                      <IoIosSend size={40} />
                    </button>
                    :
                    <button
                      onClick={() => router.push("/login")}
                      className="text-gray-500 dark:text-gray-400 font-bold hover:text-blue-500 hover:dark:text-blue-400 transition duration-300"
                    >
                      <IoIosSend size={40} />
                    </button>
                  }
                </div>
              </div>
              : ""}
          </div>
        </div>
      }
    </>
  );
}

export default AddReviews;
