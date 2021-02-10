import { createIcon } from "@chakra-ui/react";

export const NotesLogo = createIcon({
  displayName: "NotesLogo",
  viewBox: "0 0 45 67",
  path: (
    <>
      <g transform="translate(-74.5 -21)">
        <text
          transform="translate(77 75)"
          fill="currentColor"
          fontSize="50"
          fontFamily="SegoeUI-Bold, Segoe UI, san-serif"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            N
          </tspan>
        </text>
        <path
          d="M4,0,8,7H0Z"
          transform="translate(74.5 64) rotate(-90)"
          fill="currentColor"
        />
        <path
          d="M4,0,8,7H0Z"
          transform="translate(119.5 56) rotate(90)"
          fill="currentColor"
        />
      </g>
    </>
  ),
});
