import { QuizResult } from '@/types/quiz';

class MockDataProvider {
  private results: QuizResult[] = [];

  getQuizResults(): QuizResult[] {
    return this.results;
  }

  updateVibeResult(result: QuizResult): QuizResult {
    const existingIndex = this.results.findIndex(r => r.quizId === result.quizId);
    if (existingIndex >= 0) {
      this.results[existingIndex] = result;
    } else {
      this.results.push(result);
    }
    return result;
  }

  resetResults(): void {
    this.results = [];
  }
}

export const mockData = new MockDataProvider(); 