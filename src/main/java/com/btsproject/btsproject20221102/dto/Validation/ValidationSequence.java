package com.btsproject.btsproject20221102.dto.Validation;

import javax.validation.GroupSequence;
import javax.validation.Validation;
import javax.validation.groups.Default;

@GroupSequence({
        ValidationGroups.NotBlankGroup.class,
        ValidationGroups.SizeCheckGroup.class,
        ValidationGroups.PatternCheckGroup.class,
        Default.class
})

public interface ValidationSequence {
}
