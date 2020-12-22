package com.mycompany.myapp.web.rest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.spi.ConfigSource;

@Path("/management")
@Produces(MediaType.APPLICATION_JSON)
public class JHipsterConfigurationEndpoint {
  private static final String CONFIG_PROPERTIES_SOURCE_NAME = "PropertiesConfigSource[source=application.properties]";

  @GET
  @Path("/configprops")
  public Map<String, String> getConfigs() {
    Iterable<ConfigSource> configSources = ConfigProvider.getConfig().getConfigSources();
    Optional<ConfigSource> applicationPropertiesConfigSource = StreamSupport
      .stream(configSources.spliterator(), false)
      .filter(configSource -> configSource.getName().equals(CONFIG_PROPERTIES_SOURCE_NAME) && !configSource.getPropertyNames().isEmpty())
      .findFirst();

    return applicationPropertiesConfigSource.map(ConfigSource::getProperties).orElse(new HashMap<>());
  }
}
