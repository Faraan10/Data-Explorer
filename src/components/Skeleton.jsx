const Skeleton = () => {
  const skeletonItems = Array.from({ length: 30 }); // skeletons count

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skeletonItems.map(
          (
            _,
            index // Using map to render multiple skeletons
          ) => (
            <div className="flex w-72 flex-col gap-4" key={index}>
              {/* overall width of skeleton */}
              <div className="skeleton h-48 w-full"></div>
              {/* Increase height and width of skeleton rows */}
              <div className="skeleton h-6 w-1/4"></div>
              <div className="skeleton h-6 w-3/4"></div>
              <div className="skeleton h-6 w-3/4"></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Skeleton;
