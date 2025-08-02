interface Scene {
  startTime: string;
  endTime: string;
  description: string;
  basicInfo: any;
}

export interface Workflow {
  workflowId: number;
  scenes: Scene[];
}
