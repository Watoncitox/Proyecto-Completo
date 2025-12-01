package cl.duoc.style.and.beauty.cita.service;

import cl.duoc.style.and.beauty.cita.dto.CitaDTO;
import cl.duoc.style.and.beauty.cita.dto.CitaRequestDTO;
import cl.duoc.style.and.beauty.cita.model.Cita;
import cl.duoc.style.and.beauty.cita.repository.CitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CitaService {

    private final CitaRepository repository;

    public CitaService(CitaRepository repository) {
        this.repository = repository;
    }

    private CitaDTO toDTO(Cita c) {
        CitaDTO dto = new CitaDTO();
        dto.setId(c.getId());
        dto.setIdCliente(c.getIdCliente());
        dto.setIdTrabajador(c.getIdTrabajador());
        dto.setIdServicio(c.getIdServicio());
        dto.setFechaHora(c.getFechaHora());
        dto.setDuracionMin(c.getDuracionMin());
        dto.setEstado(c.getEstado());
        dto.setObservacion(c.getObservacion());
        return dto;
    }

    private Cita toEntity(CitaRequestDTO dto) {
        Cita c = new Cita();
        c.setIdCliente(dto.getIdCliente());
        c.setIdTrabajador(dto.getIdTrabajador());
        c.setIdServicio(dto.getIdServicio());
        c.setFechaHora(dto.getFechaHora());
        c.setDuracionMin(dto.getDuracionMin());
        c.setEstado(dto.getEstado());
        c.setObservacion(dto.getObservacion());
        return c;
    }

    public List<CitaDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CitaDTO findById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public CitaDTO save(CitaRequestDTO dto) {
        Cita c = toEntity(dto);
        return toDTO(repository.save(c));
    }

    public CitaDTO update(Long id, CitaRequestDTO dto) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setIdCliente(dto.getIdCliente());
                    existing.setIdTrabajador(dto.getIdTrabajador());
                    existing.setIdServicio(dto.getIdServicio());
                    existing.setFechaHora(dto.getFechaHora());
                    existing.setDuracionMin(dto.getDuracionMin());
                    existing.setEstado(dto.getEstado());
                    existing.setObservacion(dto.getObservacion());
                    return toDTO(repository.save(existing));
                })
                .orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
