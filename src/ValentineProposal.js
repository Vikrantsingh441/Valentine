import React, { useState, useEffect, useRef } from "react";
import { Heart, X, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import Confetti from "react-confetti";

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
  });
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef(null);
  const animationFrameRef = useRef();

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const noTexts = [
    "No",
    "Pkka nahi? 🤨",
    "Soch le! 🤯",
    "Ro dunga ab main 😢",
    "Bf hui tera manja 😏",
    "Pese dunga manja 💰😏",
    "Baat nahi krunga! 😤",
    "Bache ki jaan lele? 😭",
    "Sharam nahi aari 😒",
    "Zulm kyun dha rahi hai? 😩",
    "Pathhar dil 🪨💔",
    "Mummy se shikayat krdunga 😡📞",
    "Ab toh had hi hogyi 😠",
    "Is that your final answer? 🤨❓",
    "Dil tera tutuga toh pata laguga 💔😏",
  ];

  const funnyAlerts = [
    {
      title: "Bhai mana kar diya! 💔",
      description: "Dil ke tukde hazaar hue, ek yaha gira... ek waha gira...",
    },
    {
      title: "Arey sun toh sahi! 😤",
      description:
        "Itna attitude kahan se laayi? Amazon se order kiya tha kya?",
    },
    {
      title: "Ghanta farak padta hai! 🔔",
      description: "Tera No suna, par dil ne Try again ka button daba diya!",
    },
    {
      title: "Dost ki tarah ignore mat kar! 🙄",
      description: "Pyaar se poocha tha, block thodi kar raha tha!",
    },
    {
      title: "Battery Low, Himmat High! ⚡",
      description:
        "Tera No sirf ek low battery warning hai, charge firse ho jayega!",
    },
    {
      title: "Mummy ko bataunga! 😡",
      description: "Ab tu No bolegi ya mummy se complaint likhwau?",
    },
    {
      title: "Tera dil pathar ka hai kya? 🪨",
      description: "Ek Yes bolne se na bijli ka bill badega na WiFi slow hoga!",
    },
    {
      title: "Chal jhooti! 🤥",
      description:
        "Mujhe pata hai dil ke kisi kone mein haan hai, bas zubaan ziddi hai!",
    },
    {
      title: "Internet slow ho sakta hai, par main nahi! 🚀",
      description: "Jitni baar No bolegi, utni baar retry ka button dabega!",
    },
    {
      title: "Dil tera todunga toh pata lagega! 💔",
      description: "Fir kehna Mujhse galti ho gayi 😏",
    },
  ];

  const yesIncreaseSizes = {
    0: "text-lg",
    1: "text-xl",
    2: "text-2xl",
    3: "text-3xl",
    4: "text-4xl",
    5: "text-5xl",
  };

  const [moveConfig, setMoveConfig] = useState({
    angle: Math.random() * 2 * Math.PI,
    speed: 0,
    baseSpeed: 1,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (noCount > 0) {
      const exponentialSpeed = moveConfig.baseSpeed * Math.pow(2, noCount - 1);
      const speed = Math.min(exponentialSpeed, 60);
      setMoveConfig((prev) => ({
        ...prev,
        speed,
      }));
    }
  }, [noCount, moveConfig.baseSpeed]);

  useEffect(() => {
    let lastTimestamp = performance.now();

    const moveButton = (timestamp) => {
      if (!noButtonRef.current) return;

      const deltaTime = (timestamp - lastTimestamp) / 16;
      lastTimestamp = timestamp;

      if (noCount > 0) {
        const rect = noButtonRef.current.getBoundingClientRect();
        const buttonCenterX = buttonPosition.x + rect.width / 3;
        const buttonCenterY = buttonPosition.y + rect.height / 3;

        const dx = mousePosition.x - buttonCenterX;
        const dy = mousePosition.y - buttonCenterY;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        const evadeDistance = 200;
        if (distanceToMouse < evadeDistance) {
          const evadeAngle = Math.atan2(-dy, -dx);
          let targetAngle = evadeAngle;

          targetAngle += ((Math.random() - 0.5) * Math.PI) / 2;

          const angleAdjustSpeed = 0.15 + noCount * 0.05;
          setMoveConfig((prev) => ({
            ...prev,
            angle: prev.angle + (targetAngle - prev.angle) * angleAdjustSpeed,
          }));
        }

        // Define margins to keep button in the center area
        const marginX = window.innerWidth * 0.1; // 20% margin from both sides
        const marginY = window.innerHeight * 0.1; // 20% margin from top and bottom

        const maxX = window.innerWidth - rect.width - marginX;
        const maxY = window.innerHeight - rect.height - marginY;
        const minX = marginX;
        const minY = marginY;

        let newX =
          buttonPosition.x +
          Math.cos(moveConfig.angle) * moveConfig.speed * deltaTime;
        let newY =
          buttonPosition.y +
          Math.sin(moveConfig.angle) * moveConfig.speed * deltaTime;

        // Prevent the button from getting too close to the boundaries
        if (newX <= minX || newX >= maxX) {
          const randomness = Math.min(0.5 + noCount * 0.1, 1);
          setMoveConfig((prev) => ({
            ...prev,
            angle:
              Math.PI -
              prev.angle +
              (Math.random() - 0.5) * Math.PI * randomness,
          }));
          newX = Math.max(minX, Math.min(newX, maxX));
        }
        if (newY <= minY || newY >= maxY) {
          const randomness = Math.min(0.5 + noCount * 0.1, 1);
          setMoveConfig((prev) => ({
            ...prev,
            angle: -prev.angle + (Math.random() - 0.5) * Math.PI * randomness,
          }));
          newY = Math.max(minY, Math.min(newY, maxY));
        }

        setButtonPosition({ x: newX, y: newY });
      }

      animationFrameRef.current = requestAnimationFrame(moveButton);
    };

    if (noCount > 0) {
      animationFrameRef.current = requestAnimationFrame(moveButton);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [noCount, moveConfig, buttonPosition, mousePosition]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    if (showBackWarning) {
      const timer = setTimeout(() => setShowBackWarning(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showBackWarning]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    const alertIndex = Math.min(noCount, funnyAlerts.length - 1);
    setAlertMessage(funnyAlerts[alertIndex]);
    setShowAlert(true);
    setMoveConfig((prev) => ({
      ...prev,
      angle: Math.random() * 2 * Math.PI,
      speed: prev.speed * 1.1,
    }));
  };

  const handleBackClick = () => {
    setShowBackWarning(true);
    setShowConfetti(false);
    setTimeout(() => {
      setYesPressed(false);
    }, 1000);
  };

  const getNoButtonText = () => {
    return noTexts[Math.min(noCount, noTexts.length - 1)];
  };

  const getYesButtonSize = () => {
    return (
      yesIncreaseSizes[
        Math.min(noCount, Object.keys(yesIncreaseSizes).length - 1)
      ] || "text-6xl"
    );
  };

  if (yesPressed) {
    return (
      <div className="vh-100 ">
        {showConfetti && (
          <Confetti
            width={window.innerWidth * 0.99}
            height={window.innerHeight * 0.99}
          />
        )}
        {showBackWarning && (
          <Alert className="position-fixed top-0 mt-3 w-50 bg-warning">
            <AlertTitle>Warning: Risky Operation! 💝</AlertTitle>
            <AlertDescription>
              Are you sure? The "No" button has been working out while you were
              gone...
            </AlertDescription>
          </Alert>
        )}
        <div
          style={{
            position: "relative", // Establish a positioning context
            width: "100vw", // Full viewport width
            height: "100vh", // Full viewport height
            overflow: "hidden", // Hide overflowing children
            backdropFilter: "blur(5px)",
          }}
          className="text-center"
        >
          <h1
            className="display-4 text-danger"
            style={{ fontWeight: 800, paddingTop: "40vh" }}
          >
            🎉 YAYYY!! 🎉
          </h1>
          <p className="h4" style={{ color: "#ff88c4" }}>
            I knew you'd say yes! 💖
          </p>
          <div
            className="gap-2"
            style={{
              position: "relative",
              left: "-671px",
              bottom: "-45vh",
            }}
          >
            {[...Array(40)].map((_, i) => (
              <Heart
                key={i}
                size={40}
                className="floating-heart position-absolute text-danger"
                style={{
                  left: `${20 * (i + 1)}%`,
                  right: `${20 * (i + 1)}%`,
                  animationDelay: `${i / 2}.${i}s`,
                }}
              />
            ))}
          </div>
          <p className="h5 mt-4" style={{ color: "#ec9c2e" }}>
            Now let's go on a date, I'm hungry 🫵 😋
          </p>
          <button
            onClick={handleBackClick}
            style={{ background: "#ca9851" }}
            className="btn m-3 align-items-center gap-2"
          >
            <ArrowLeft className="me-2" />
            Test other options
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAlert && (
        <Alert className="position-fixed top-0 mt-3 w-50 bg-danger text-white">
          <AlertTitle>{alertMessage.title}</AlertTitle>
          <AlertDescription>{alertMessage.description}</AlertDescription>
        </Alert>
      )}
      <div className="text-center" style={{ backdropFilter: "blur(5px)" }}>
        <h1
          className="h1 text-dark"
          style={{ paddingTop: "40vh", fontWeight: "bold" }}
        >
          🌹 Hey my Cutie patootie! 🌹
        </h1>
        <p
          className="h4"
          style={{
            background: "linear-gradient(to bottom, #ff0ecd, red)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.5rem",
            marginBottom: "20px",
          }}
        >
          Will you be my Valentine?
        </p>

        <div className="my-3">
          <button
            onClick={() => {
              setYesPressed(true);
              setShowConfetti(true);
            }}
            className={`btn btn-success btn-lg ${getYesButtonSize()} py-2 px-4 me-2`}
          >
            Yes 😊
          </button>

          <button
            ref={noButtonRef}
            onClick={handleNoClick}
            className={`btn btn-danger btn-lg py-2 px-4 
              ${getNoButtonText() != "No" && "position-absolute"}
            `}
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
              zIndex: "1000",
            }}
          >
            {getNoButtonText()}
          </button>
        </div>
        <p className="mt-4" style={{ color: "#3f9c3f", padding: "0px 8px" }}>
          {noCount > 0 &&
            "Hint: The 'Yes' button is getting bigger for a reason 😉"}
          {noCount > 2 && <br />}
          {noCount > 2 && "P.S. Good luck catching that button now! 🏃‍♀️💨"}
        </p>
      </div>
    </>
  );
};

export default ValentineProposal;
