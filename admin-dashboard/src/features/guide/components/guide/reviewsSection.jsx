import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedSection from "./animatedSection.jsx";
import { Star, X, Trash2 } from "lucide-react";
import {deleteFeedBackService} from "../../../auth/login/api/deleteFeedBackService.jsx";
import {getGuideService} from "../../api/getGuideService.jsx";

/**
 * Props:
 * - feedbacks: array (initial list from the parent detail response)
 * - rating: number (average rating)
 */
export default function ReviewsSection({
                                           feedbacks,
                                           rating,
                                            id
                                       }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();
    const averageRating = rating;
    const items = feedbacks;

    // Delete feedback handler
    const handleDeleteFeedback = async (feedbackId) => {
        const result=await dispatch(deleteFeedBackService(feedbackId));
        if(result.type==='deleteFeedBackService/fulfilled')
        {
            alert('Information updated successfully!');
        }
        else {
            alert('Problem happened ');
        }
        dispatch(getGuideService({id}))
    };

    // Star renderer
    const DisplayStars = ({ value }) => (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${
                        i < Math.floor(Number(value || 0))
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                    }`}
                />
            ))}
        </div>
    );

    return (
        <AnimatedSection delay={500}>
            <section className="mt-12 bg-gradient-to-br">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="text-2xl dark:text-white font-bold text-gray-900">
                            What Travelers Say
                        </h2>
                        <p className="text-sm dark:text-white text-gray-600 mt-1">
                            {items.length} review{items.length !== 1 ? "s" : ""} • Avg{" "}
                            {averageRating}/5
                        </p>
                    </div>
                </div>

                {/* REVIEWS LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((feedback) => {
                        const userImage = feedback.user?.image?.[0]?.url?.[0];
                        return (
                            <div
                                key={feedback.id}
                                className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                            >
                                {/* User Info Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-gradient-to-br from-[#519489] to-[#6ba89d] text-white font-bold flex-shrink-0"
                                        onClick={() => setSelectedUser(feedback.user)}
                                    >
                                        {userImage ? (
                                            <img
                                                src={userImage}
                                                alt={feedback.user?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            feedback.user?.name?.charAt(0) || "A"
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                            {feedback.user?.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <DisplayStars value={feedback.rating} />
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {feedback.rating}/5
                                            </span>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 flex-shrink-0"
                                        title="Delete Review"
                                        onClick={() => handleDeleteFeedback(feedback.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Comment Content */}
                                <div className="mt-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                        {feedback.comment}
                                    </p>

                                    {/* Date */}
                                    {feedback.date && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                            {new Date(feedback.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {items.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Star className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No Reviews Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Be the first to share your experience!
                        </p>
                    </div>
                )}

                {/* USER MODAL */}
                {selectedUser && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setSelectedUser(null)}
                    >
                        <div
                            className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 flex flex-col items-center max-w-sm w-full relative mx-4 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                onClick={() => setSelectedUser(null)}
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* User Avatar */}
                            {selectedUser.image?.[0]?.url?.[0] ? (
                                <img
                                    src={selectedUser.image[0].url[0]}
                                    alt={selectedUser.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white dark:border-gray-700 shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-[#519489] to-[#6ba89d] text-white text-2xl font-bold mb-4 shadow-lg">
                                    {selectedUser.name?.charAt(0) || "A"}
                                </div>
                            )}

                            {/* User Info */}
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                                {selectedUser.name}
                            </h2>
                            {selectedUser.email && (
                                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                                    {selectedUser.email}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </AnimatedSection>
    );
}