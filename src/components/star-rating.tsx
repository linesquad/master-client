export function StarRating({ value }: { value: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let starType: "full" | "half" | "empty";
    if (i <= value) {
      starType = "full";
    } else if (i - value <= 0.5) {
      starType = "half";
    } else {
      starType = "empty";
    }

    if (starType === "full") {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1.5 12.59,7.36 18.9,7.64 13.97,11.97 15.54,18.09 10,14.5 4.46,18.09 6.03,11.97 1.1,7.64 7.41,7.36" />
        </svg>
      );
    } else if (starType === "half") {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`half-gradient-${i}`}>
              <stop offset="50%" stopColor="#f59e42" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <polygon
            points="10,1.5 12.59,7.36 18.9,7.64 13.97,11.97 15.54,18.09 10,14.5 4.46,18.09 6.03,11.97 1.1,7.64 7.41,7.36"
            fill={`url(#half-gradient-${i})`}
            stroke="#f59e42"
            strokeWidth="0.5"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1.5 12.59,7.36 18.9,7.64 13.97,11.97 15.54,18.09 10,14.5 4.46,18.09 6.03,11.97 1.1,7.64 7.41,7.36" />
        </svg>
      );
    }
  }
  return <div className="flex">{stars}</div>;
}
