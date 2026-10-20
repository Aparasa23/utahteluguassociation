/**
 * Autonomous Participant Collaboration & AI Proofreading Engine
 * Validates audio track lengths, proofreads Telugu/English performance bios, detects duplicate songs,
 * and automatically dispatches correction requests to team leads.
 */

export interface PerformanceSubmission {
  id: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  groupName: string;
  category: 'CLASSICAL_KUCHIPUDI' | 'FOLK_TELLUGU' | 'CINEMATIC_DANCE' | 'VOCAL_CARNATIC' | 'DRAMA_SKIT';
  songTitle: string;
  movieOrAlbumName?: string;
  performerCount: number;
  performerNames: string[];
  ageGroup: 'KIDS_UNDER_10' | 'TEENS_11_17' | 'ADULTS' | 'MIXED_FAMILY';
  audioTrack?: {
    fileName: string;
    durationSeconds: number; // Max allowed: 300 seconds (5 min)
    fileSizeBytes: number;
    mimeType: string;
  };
  choreographerOrGuru?: string;
  bioNotes: string;
}

export interface ProofreadResult {
  isValid: boolean;
  score: number; // 0 - 100
  errors: string[];
  warnings: string[];
  suggestions: string[];
  automatedActionRequired?: 'REQUEST_NEW_AUDIO' | 'EXPAND_BIO' | 'SONG_DUPLICATE_RESOLVE' | 'READY_FOR_STAGE';
  automatedEmailTemplate?: {
    subject: string;
    bodyText: string;
    actionUrl: string;
  };
}

export class ParticipantProofreaderEngine {
  private static readonly MAX_TRACK_DURATION_SEC = 300; // 5:00 minutes max
  private static readonly MAX_FILE_SIZE_MB = 25; // 25 MB max

  /**
   * 1. Full Proofreading & Track Validation Pipeline
   */
  static proofreadSubmission(
    entry: PerformanceSubmission,
    existingSubmissions: PerformanceSubmission[] = []
  ): ProofreadResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // A. Audio Track Duration & Format Checks
    if (!entry.audioTrack) {
      errors.push('No audio track uploaded. An MP3 or WAV file is mandatory for stage performances.');
    } else {
      if (entry.audioTrack.durationSeconds > this.MAX_TRACK_DURATION_SEC) {
        const excessSec = entry.audioTrack.durationSeconds - this.MAX_TRACK_DURATION_SEC;
        const mins = Math.floor(entry.audioTrack.durationSeconds / 60);
        const secs = Math.round(entry.audioTrack.durationSeconds % 60);
        errors.push(
          `Audio track length is ${mins}:${secs < 10 ? '0' : ''}${secs} (exceeds the strict 5:00 minute stage limit by ${excessSec} seconds).`
        );
      }

      if (!['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav'].includes(entry.audioTrack.mimeType) &&
          !entry.audioTrack.fileName.toLowerCase().endsWith('.mp3') &&
          !entry.audioTrack.fileName.toLowerCase().endsWith('.wav')) {
        errors.push('Invalid audio format. Please upload standard MP3 or WAV audio.');
      }

      if (entry.audioTrack.fileSizeBytes > this.MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`Audio file size exceeds the ${this.MAX_FILE_SIZE_MB}MB limit.`);
      }
    }

    // B. Duplicate Song Track Detection Across Other Groups
    const songTitleSafe = entry.songTitle || '';
    const normalizedSong = songTitleSafe.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const duplicate = existingSubmissions.find(
      (s) => s.id !== entry.id && (s.songTitle || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedSong
    );
    if (duplicate && normalizedSong.length > 0) {
      warnings.push(
        `Another group ("${duplicate.groupName || 'Community Group'}") has also registered the song "${duplicate.songTitle}". In the interest of variety for the audience, consider a medley or alternate track.`
      );
    }

    // C. Bio & Description Proofreading
    const bioSafe = entry.bioNotes || '';
    if (!bioSafe || bioSafe.trim().length < 30) {
      warnings.push('Stage introduction bio is very brief. Providing 2-3 sentences about your group helps our emcee introduce your performers gracefully.');
    }

    // D. Performer Count vs Category Match
    const pCount = entry.performerCount || 0;
    const pNames = entry.performerNames || [];
    if (entry.category === 'CLASSICAL_KUCHIPUDI' && pCount === 1 && !entry.choreographerOrGuru) {
      suggestions.push('Consider adding your classical Guru/Dance Academy name for recognition in the event souvenir booklet.');
    }

    if (pCount > 0 && pNames.length < pCount) {
      warnings.push(`Performer count is ${pCount}, but only ${pNames.length} names were listed.`);
    }

    // Determine Action & Prepare Automated Communication
    const isValid = errors.length === 0;
    let automatedAction: ProofreadResult['automatedActionRequired'] = 'READY_FOR_STAGE';
    let emailTemplate = undefined;

    if (!isValid) {
      if (errors.some((e) => e.includes('Audio track length'))) {
        automatedAction = 'REQUEST_NEW_AUDIO';
        emailTemplate = {
          subject: `Action Needed: Audio Track Length for "${entry.songTitle}" — UTA Sankranthi 2027`,
          bodyText: `Namaste ${entry.leadName},\n\nThank you for registering "${entry.songTitle}" for the Utah Telugu Association Cultural Stage!\n\nOur automated stage manager noticed that your audio track is currently longer than the 5:00 minute stage limit. To ensure all ${existingSubmissions.length + 1} community groups have their dedicated stage time, please upload a trimmed 5-minute track using the secure link below:\n\nhttps://utahtelugu.org/performances/edit?id=${entry.id}\n\nPlease update before the January 10 deadline.\n\nWarm regards,\nUtah Telugu Association Cultural Committee`,
          actionUrl: `https://utahtelugu.org/performances/edit?id=${entry.id}`,
        };
      }
    }

    const score = Math.max(0, 100 - errors.length * 35 - warnings.length * 10);

    return {
      isValid,
      score,
      errors,
      warnings,
      suggestions,
      automatedActionRequired: automatedAction,
      automatedEmailTemplate: emailTemplate,
    };
  }

  /**
   * 2. Automated Emcee Cue Sheet Generator
   * Compiles all verified group entries into a formatted stage script for event hosts.
   */
  static generateEmceeCueSheet(verifiedEntries: PerformanceSubmission[]): Array<{
    slotNumber: number;
    estimatedTime: string;
    groupName: string;
    songTitle: string;
    category: string;
    performerCount: number;
    spokenEmceeIntro: string;
    audioTrackFile: string;
  }> {
    let currentTimeMinutes = 18 * 60; // 6:00 PM start time

    return verifiedEntries.map((item, index) => {
      const hours = Math.floor(currentTimeMinutes / 60);
      const mins = currentTimeMinutes % 60;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const timeStr = `${formattedHours}:${mins < 10 ? '0' : ''}${mins} ${ampm}`;

      // Advance by track duration + 2 minute stage transition
      const trackDuration = item.audioTrack?.durationSeconds || 240;
      currentTimeMinutes += Math.ceil((trackDuration + 120) / 60);

      const intro = `Ladies and gentlemen, put your hands together for our next performance! From ${item.groupName}, presenting a ${item.category.replace('_', ' ')} entitled "${item.songTitle}" featuring ${item.performerCount} talented artists! ${item.bioNotes}`;

      return {
        slotNumber: index + 1,
        estimatedTime: timeStr,
        groupName: item.groupName,
        songTitle: item.songTitle,
        category: item.category,
        performerCount: item.performerCount,
        spokenEmceeIntro: intro,
        audioTrackFile: item.audioTrack?.fileName || 'standard_track.mp3',
      };
    });
  }
}
