export interface SentMessage {
	hop: number;
	final: number;
}

export interface SentMessages {
	[key: number]: SentMessage[];
}

export interface RecvMessage {
	hop: number;
	final: number;
	failed: boolean;
}

export interface RecvMessages {
	[key: number]: SentMessage[];
}

export interface ISimulationMessageObserver {
	newSentMessages(msgs: SentMessages): void;
	newRecvMessages(msgs: RecvMessages): void;
}
