import { SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'

const config = jasmine.getEnv().configuration();
config.random = false;
jasmine.getEnv().configure(config);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;
jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    }
  })
)

