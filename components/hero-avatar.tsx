export default function HeroAvatar() {
  return (
    <div className="hero-avatar-orbit">
      <svg
        viewBox="0 0 420 420"
        className="h-auto w-full"
        role="img"
        aria-label="Eper Gaboni avatar"
      >
        <image
          href="/illustrations/avatar.png"
          x="-110"
          y="-130"
          width="600"
          height="600"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}
