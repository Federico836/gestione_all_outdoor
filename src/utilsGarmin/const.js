const workoutProvider = 'MagneticDays'

const workoutSportType = {
    RUNNING: 'RUNNING', 
    CYCLING: 'CYCLING', 
    LAP_SWIMMING: 'LAP_SWIMMING', 
    STRENGTH_TRAINING: 'STRENGTH_TRAINING', 
    CARDIO_TRAINING: 'CARDIO_TRAINING', 
    GENERIC: 'GENERIC', 
    YOGA: 'YOGA', 
    PILATES: 'PILATES'
}

const workoutStepType = {
    WorkoutStep: 'WorkoutStep',
    WorkoutRepeatStep: 'WorkoutRepeatStep'
}

const stepRepeatType = {
    REPEAT_UNTIL_STEPS_CMPLT: 'REPEAT_UNTIL_STEPS_CMPLT',   
    REPEAT_UNTIL_TIME: 'REPEAT_UNTIL_TIME', 
    REPEAT_UNTIL_DISTANCE: 'REPEAT_UNTIL_DISTANCE',   
    REPEAT_UNTIL_CALORIES: 'REPEAT_UNTIL_CALORIES', 
    REPEAT_UNTIL_HR_LESS_THAN: 'REPEAT_UNTIL_HR_LESS_THAN',   
    REPEAT_UNTIL_HR_GREATER_THAN: 'REPEAT_UNTIL_HR_GREATER_THAN',   
    REPEAT_UNTIL_POWER_LESS_THAN: 'REPEAT_UNTIL_POWER_LESS_THAN',   
    REPEAT_UNTIL_POWER_GREATER_THAN: 'REPEAT_UNTIL_POWER_GREATER_THAN',   
    REPEAT_UNTIL_POWER_LAST_LAP_LESS_THAN: 'REPEAT_UNTIL_POWER_LAST_LAP_LESS_THAN',   
    REPEAT_UNTIL_MAX_POWER_LAST_LAP_LESS_THAN: 'REPEAT_UNTIL_MAX_POWER_LAST_LAP_LESS_THAN'
}

const stepIntensityType = {
    REST: 'REST',
    WARMUP: 'WARMUP',
    COOLDOWN: 'COOLDOWN',
    RECOVERY: 'RECOVERY',
    INTERVAL: 'INTERVAL'
}

const stepDurationType = {
    TIME: 'TIME',
    DISTANCE: 'DISTANCE',
    HR_LESS_THAN: 'HR_LESS_THAN',
    HR_GREATER_THAN: 'HR_GREATER_THAN',
    CALORIES: 'CALORIES',
    OPEN: 'OPEN',
    POWER_LESS_THAN: 'POWER_LESS_THAN',
    POWER_GREATER_THAN: 'POWER_GREATER_THAN',
    REPETITION_TIME: 'REPETITION_TIME',
    REPS: 'REPS',
    TIME_AT_VALID_CDA: 'TIME_AT_VALID_CDA',
    FIXED_REST: 'FIXED_REST'
}

const stepDurationValueType = {
    PERCENT: 'PERCENT',
    MILE: 'MILE',
    KILOMETER: 'KILOMETER',
    METER: 'METER',
    YARD: 'YARD'
}

const stepTargetType = {
    SPEED: 'SPEED',
    HEART_RATE: 'HEART_RATE',
    OPEN: 'OPEN',
    CADENCE: 'CADENCE',
    POWER: 'POWER',
    GRADE: 'GRADE',
    RESISTANCE: 'RESISTANCE',
    POWER_3S: 'POWER_3S',
    POWER_10S: 'POWER_10S',
    POWER_30S: 'POWER_30S',
    POWER_LAP: 'POWER_LAP',
    SWIM_STROKE: 'SWIM_STROKE',
    SPEED_LAP: 'SPEED_LAP',
    HEART_RATE_LAP: 'HEART_RATE_LAP',
    PACE: 'PACE'
}

const stepTargetValueType = {...stepDurationValueType}

const stepStrokeType = {
    BACKSTROKE: 'BACKSTROKE',
    BREASTSTROKE: 'BREASTSTROKE',
    DRILL: 'DRILL',
    BUTTERFLY: 'BUTTERFLY',
    FREESTYLE: 'FREESTYLE',
    MIXED: 'MIXED',
    IM: 'IM'
}

const stepEquipmentType = {
    NONE: 'NONE',
    SWIM_FINS: 'SWIM_FINS',
    SWIM_KICKBOARD: 'SWIM_KICKBOARD',
    SWIM_PADDLES: 'SWIM_PADDLES',
    SWIM_PULL_BUOY: 'SWIM_PULL_BUOY',
    SWIM_SNORKEL: 'SWIM_SNORKEL'
}

const exerciseCategory = {
    BENCH_PRESS: 'BENCH_PRESS',
    CALF_RAISE: 'CALF_RAISE',
    CARDIO: 'CARDIO',
    CARRY: 'CARRY',
    CHOP: 'CHOP',
    CORE: 'CORE',
    CRUNCH: 'CRUNCH',
    CURL: 'CURL ', 
    DEADLIFT: 'DEADLIFT',
    FLYE: 'FLYE',
    HIP_RAISE: 'HIP_RAISE',
    HIP_STABILITY: 'HIP_STABILITY',
    HIP_SWING: 'HIP_SWING',
    HYPEREXTENSION: 'HYPEREXTENSION',
    LATERAL_RAISE: 'LATERAL_RAISE',
    LEG_CURL: 'LEG_CURL',
    LEG_RAISE: 'LEG_RAISE',
    LUNGE: 'LUNGE',
    OLYMPIC_LIFT: 'OLYMPIC_LIFT',
    PLANK: 'PLANK',
    PLYO: 'PLYO',
    PULL_UP: 'PULL_UP',
    PUSH_UP: 'PUSH_UP',
    ROW: 'ROW',
    SHOULDER_PRESS: 'SHOULDER_PRESS',
    SHOULDER_STABILITY: 'SHOULDER_STABILITY',
    SHRUG: 'SHRUG',
    SIT_UP: 'SIT_UP',
    SQUAT: 'SQUAT',
    TOTAL_BODY: 'TOTAL_BODY ', 
    TRICEPS_EXTENSION: 'TRICEPS_EXTENSION',
    WARM_UP: 'WARM_UP',
    RUN: 'RUN',
    BIKE: 'BIKE',
    CARDIO_SENSORS: 'CARDIO_SENSORS',
    UNKNOWN: 'UNKNOWN',
    INVALID: 'INVALID'
}
const stepWeightDisplayUnit = {
    OTHER: 'OTHER',
    KILOGRAM: 'KILOGRAM',
    POUND: 'POUND'
}

export {
    workoutProvider,
    workoutSportType,
    workoutStepType,
    stepRepeatType,
    stepIntensityType,
    stepDurationType,
    stepTargetType,
    stepTargetValueType,
    stepStrokeType,
    stepEquipmentType,
    exerciseCategory,
    stepWeightDisplayUnit,
    stepDurationValueType
}
