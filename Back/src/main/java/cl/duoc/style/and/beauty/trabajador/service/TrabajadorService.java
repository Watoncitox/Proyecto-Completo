package cl.duoc.style.and.beauty.trabajador.service;

import cl.duoc.style.and.beauty.trabajador.dto.TrabajadorDTO;
import cl.duoc.style.and.beauty.trabajador.dto.TrabajadorRequestDTO;
import cl.duoc.style.and.beauty.trabajador.model.Trabajador;
import cl.duoc.style.and.beauty.trabajador.repository.TrabajadorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrabajadorService {

    private final TrabajadorRepository repository;

    public TrabajadorService(TrabajadorRepository repository) {
        this.repository = repository;
    }

    private TrabajadorDTO toDTO(Trabajador t) {
        TrabajadorDTO dto = new TrabajadorDTO();
        dto.setId(t.getId());
        dto.setIdUsuario(t.getIdUsuario());
        dto.setEspecialidad(t.getEspecialidad());
        dto.setExperiencia(t.getExperiencia());
        return dto;
    }

    private Trabajador toEntity(TrabajadorRequestDTO dto) {
        Trabajador t = new Trabajador();
        t.setIdUsuario(dto.getIdUsuario());
        t.setEspecialidad(dto.getEspecialidad());
        t.setExperiencia(dto.getExperiencia());
        return t;
    }

    public List<TrabajadorDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TrabajadorDTO findById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public TrabajadorDTO save(TrabajadorRequestDTO dto) {
        Trabajador t = toEntity(dto);
        return toDTO(repository.save(t));
    }

    public TrabajadorDTO update(Long id, TrabajadorRequestDTO dto) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setIdUsuario(dto.getIdUsuario());
                    existing.setEspecialidad(dto.getEspecialidad());
                    existing.setExperiencia(dto.getExperiencia());
                    return toDTO(repository.save(existing));
                })
                .orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
