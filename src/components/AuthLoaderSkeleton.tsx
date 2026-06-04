import { Skeleton } from "../ui/Skeleton";


function AuthLoader() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-20">
                <Skeleton className="h-8 w-24" />

                <div className="flex gap-10">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                </div>

                <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-20 py-12">
                <Skeleton className="h-12 w-80 mb-4" />
                <Skeleton className="h-6 w-96 mb-10" />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 bg-white shadow-sm rounded-xl p-6 space-y-4"
                        >
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-12 w-24" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-10 w-full mt-4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthLoader;