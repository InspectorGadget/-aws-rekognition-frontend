export interface ServerResponse {
    AgeRange: {
        High: number;
        Low: number;
    };
    Beard: {
        Confidence: number;
        Value: boolean;
    };
    BoundingBox: {
        Height: number;
        Left: number;
        Top: number;
        Width: number;
    };
    Confidence: number;
    Eyeglasses: {
        Confidence: number;
        Value: number;
    };
    EyesOpen: {
        Confidence: number;
        Value: number;
    };
    Gender: {
        Confidence: number;
        Value: string;
    };
    MouthOpen: {
        Confidence: number;
        Value: number;
    };
    Mustache: {
        Confidence: number;
        Value: number;
    };
    Pose: {
        Confidence: number;
        Value: number;  
    };
    Quality: {
        Confidence: number;
        Value: number;  
    };
    Smile: {
        Confidence: number;
        Value: number;  
    };
    Sunglasses: {
        Confidence: number;
        Value: number;  
    };
    Landmarks: Landmark[];
    Emotions: Emotion[];
}

export interface Emotion {
    Confidence: number;
    Type: string;
}

export interface Landmark {
    Type: string;
    X: number;
    Y: number;
}