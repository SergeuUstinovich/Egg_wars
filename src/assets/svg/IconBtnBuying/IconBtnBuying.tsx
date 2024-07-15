interface IBtnIconBuying {
  className?: string;
}

export function IconBtnBuying({ className }: IBtnIconBuying) {
  return (
    <svg
      className={className}
      width="39"
      height="40"
      viewBox="0 0 39 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1.8877"
        width="36.1053"
        height="37.0526"
        rx="11"
        fill="#2A9C14"
      />
      <rect
        x="1"
        y="1.8877"
        width="36.1053"
        height="37.0526"
        rx="11"
        stroke="#003202"
        strokeWidth="2"
      />
      <rect
        x="2"
        y="2.52051"
        width="34"
        height="34"
        rx="10"
        fill="url(#paint0_linear_301_2789)"
      />
      <rect
        x="3"
        y="3.52051"
        width="32"
        height="32"
        rx="9"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="2"
        // style="mix-blend-mode:soft-light"
      />
      <defs>
        <linearGradient
          id="paint0_linear_301_2789"
          x1="19"
          y1="2.52051"
          x2="19"
          y2="36.5205"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BCE93A" />
          <stop offset="1" stopColor="#7AC021" />
        </linearGradient>
      </defs>
    </svg>
  );
}
