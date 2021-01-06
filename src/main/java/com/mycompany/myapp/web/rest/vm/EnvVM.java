package com.mycompany.myapp.web.rest.vm;

import io.quarkus.runtime.annotations.RegisterForReflection;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

@RegisterForReflection
public class EnvVM {
  private final Collection<String> activeProfiles;
  private final Collection<PropertySource> propertySources;

  public EnvVM(Collection<String> activeProfiles, Collection<PropertySource> propertySources) {
    this.activeProfiles = activeProfiles;
    this.propertySources = propertySources;
  }

  public Collection<String> getActiveProfiles() {
    return activeProfiles;
  }

  public Collection<PropertySource> getPropertySources() {
    return propertySources;
  }

  public static class PropertySource {
    private final String name;
    private final Map<String, PropertyValue> properties;

    public PropertySource(String name, Map<String, String> properties) {
      this.name = name;
      this.properties = properties.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey, PropertyValue::new));
    }

    public String getName() {
      return name;
    }

    public Map<String, PropertyValue> getProperties() {
      return properties;
    }

    public static class PropertyValue {
      private final String value;

      public PropertyValue(Map.Entry<String, String> entry) {
        this.value = entry.getValue();
      }

      public PropertyValue(String value) {
        this.value = value;
      }

      public String getValue() {
        return value;
      }
    }
  }
}
