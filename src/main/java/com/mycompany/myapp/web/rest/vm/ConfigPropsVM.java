package com.mycompany.myapp.web.rest.vm;

import java.util.HashMap;
import java.util.Map;

public class ConfigPropsVM {
  private final Map<String, Context> contexts = new HashMap<>();

  public ConfigPropsVM() {
    this.contexts.put("JHipster", new Context());
  }

  public Map<String, Context> getContexts() {
    return contexts;
  }

  public class Context {
    private final Map<String, Object> beans = new HashMap<>();

    public Map<String, Object> getBeans() {
      return beans;
    }
  }
}
