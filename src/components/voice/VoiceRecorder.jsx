import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMic, FiSquare, FiPlay, FiPause, FiTrash2, FiUpload, FiX 
} from 'react-icons/fi';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';

const VoiceRecorder = ({ onSave, maxDuration = 300 }) => {
  const {
    isRecording,
    isPaused,
    duration,
    audioUrl,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording
  } = useVoiceRecorder();

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSave = () => {
    if (audioBlob) {
      onSave?.({
        type: 'audio',
        url: audioUrl,
        blob: audioBlob,
        duration
      });
      resetRecording();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
      {/* Audio Player */}
      {audioUrl && !isRecording && (
        <div className="mb-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
          
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/70 transition-colors"
            >
              {isPlaying ? (
                <FiPause className="w-4 h-4" />
              ) : (
                <FiPlay className="w-4 h-4" />
              )}
            </button>
            
            <div className="flex-1">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration }}
                />
              </div>
            </div>
            
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {formatDuration(duration)}
            </span>
          </div>
        </div>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-3 h-3 rounded-full bg-red-500"
          />
          <span className="text-red-500 font-medium">
            Recording...
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-mono">
            {formatDuration(duration)} / {formatDuration(maxDuration)}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isRecording && !audioUrl && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors"
          >
            <FiMic className="w-5 h-5" />
            Start Recording
          </motion.button>
        )}

        {isRecording && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isPaused ? resumeRecording : pauseRecording}
              className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              {isPaused ? (
                <FiPlay className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <FiPause className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <FiSquare className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </>
        )}

        {audioUrl && !isRecording && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetRecording}
              className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <FiTrash2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors"
            >
              <FiUpload className="w-5 h-5" />
              Save Recording
            </motion.button>
          </>
        )}
      </div>

      {/* Help Text */}
      {!isRecording && !audioUrl && (
        <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
          Click to start recording your voice memory. Maximum duration: {formatDuration(maxDuration)}
        </p>
      )}
    </div>
  );
};

export default VoiceRecorder;

