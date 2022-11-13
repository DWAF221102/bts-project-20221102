package com.btsproject.btsproject20221102.aop;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LogAop {
    @Pointcut("annotation(com.btsproject.btsproject20221102.aop.annotation.LogAspect)")
    private void annotationPointcut(){}

    @Around("annotationPointcut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();

        String[] argNames = codeSignature.getParameterNames();

        StringBuilder argNameString = new StringBuilder();
        StringBuilder argDataString = new StringBuilder();

        for(int i = 0; i < argNames.length; i++){
            argNameString.append(argNames[i]);
            argDataString.append(args[i].toString());
            if(i != argNames.length -1) {
                argNameString.append(", ");
                argDataString.append(", ");
            }

            log.info("Method call --> {}.{}({}) >>> {}",
                    joinPoint.getSignature().getDeclaringTypeName(),
                    joinPoint.getSignature().getName(),
                    argNameString.toString(),
                    argDataString.toString());
        }

        Object result = joinPoint.proceed();

        log.info("Method return --> {}.{}({}) >>> {}",
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                argNameString.toString(),
                result);

        return result;
    }
}
