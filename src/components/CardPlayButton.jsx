import { Pause, Play } from './Player.jsx';
import { usePlayerStore } from '@/store/playerStore.js';

export default function CardPlayButton({ id }) {
    const { isPlaying, setIsPlaying, setCurrentMusic, currentMusic } =
        usePlayerStore((state) => state);
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;
    const handleClick = () => {
        if (isPlayingPlaylist) {
            setIsPlaying(false);
            return;
        }

        fetch(`/api/get-info-playlist.json?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                const { songs, playlist } = data;
                setIsPlaying(true);
                setCurrentMusic({ songs, playlist, song: songs[0] });
            });
    };

    return (
        <button
            onClick={handleClick}
            className="card-play-button rounded-full bg-green-500 p-4"
        >
            {isPlayingPlaylist ? <Pause /> : <Play />}
        </button>
    );
}
