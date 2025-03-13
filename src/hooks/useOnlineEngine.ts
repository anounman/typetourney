import { useEffect } from "react";
import { useType } from "./useType";
import { useState } from "react";
import { useInputContext } from "../components/input-provider";
import { Socket } from "socket.io-client";
import { getSocket } from "@/api/room-socket";
import { useWords } from "./useWrods";
import { Room } from "@/types/type";


export const useOnlineEngine = ({ room, setRoom, setWord, raceStart }: { raceStart: boolean, room: Room, setRoom: React.Dispatch<React.SetStateAction<Room>>, setWord: React.Dispatch<React.SetStateAction<string>> }) => {
    const [totalTime, setTotalTime] = useState(room.totalTime);
    const { input, setInput } = useInputContext();
    const { words, updateGeneratedWords } = useWords(0, room.word);

    const { setTimeLeft,
        calculateWPM, calculateAccuracy, calculateWords, handelTyping, timeLeft, setIsTyping, startCountdown
    } = useType(words, totalTime, updateGeneratedWords, setRoom, raceStart);
    const socketInstance = getSocket();
    const [socket, setSocket] = useState<Socket | null>(socketInstance);

    const getInitilizedSocket = () => {
        setSocket(socketInstance);
        return socket;
    };

    useEffect(() => {
        setWord(words);
        setRoom((prev) => {
            const newRoom = prev;
            newRoom.word = words;
            return newRoom;
        });
    }, [words, setWord, setRoom])
    useEffect(() => {
        if (raceStart) {
            startCountdown();
        }
    }, [raceStart, startCountdown])





    useEffect(() => {
        setSocket(socketInstance);
    }, [socketInstance]);



    useEffect(() => {
        window.removeEventListener("keydown", handelTyping);
        window.addEventListener("keydown", handelTyping);
        return () => {
            window.removeEventListener("keydown", handelTyping);
        }
    }, [handelTyping]);

    useEffect(() => {
        setIsTyping(room.isActive);
    }, [room.isActive, setIsTyping]);

    return { calculateAccuracy, words, input, setInput, timeLeft, calculateWords, calculateWPM, setTimeLeft, setTotalTime, totalTime, handelTyping, socket, getInitilizedSocket };
};